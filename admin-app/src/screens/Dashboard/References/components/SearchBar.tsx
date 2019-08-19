import dateHelper from '@services/utils/formatDate'
import { Button, DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import * as React from 'react'
import { ISearchBarProps } from './types'

const FormItem = Form.Item
const { removeTimezone } = dateHelper

const SearchBar = (props: ISearchBarProps) => {
  const { getFieldDecorator } = props.form
  return (<div className="searchFormWrapper">
    <Form layout="inline" className="searchForm">
      <FormItem>
      {getFieldDecorator('txtSearchText', {
        initialValue: '',
      })(
        <Input id="txtSearchText" className="txtSearch"
        placeholder="Search for references" />
      )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('dtStartDate', {
            initialValue: '',
            rules: [{
              // tslint:disable-next-line:no-any
              validator: (rule: any, value: Moment, callback: (msg?: string) => void) => {
                const endDate = removeTimezone(props.form.getFieldsValue().dtEndDate)
                if(endDate && value && removeTimezone(value).isAfter(endDate)) {
                  callback('Start date can not be after end date')
                }
                props.form.setFields({
                  dtEndDate: {
                    errors: null,
                    value: props.form.getFieldsValue().dtEndDate,
                  },
                })
                callback()
              },
            }],
          })(
            <DatePicker
              format='DD/MM/YYYY'
            />
          )}
        </FormItem>
        <FormItem label='To'>
        {getFieldDecorator('dtEndDate', {
            initialValue: '',
            rules: [{
              // tslint:disable-next-line:no-any
              validator: (rule: any, value: Moment, callback: (msg?: string) => void) => {
                const startDate = removeTimezone(props.form.getFieldsValue().dtStartDate)
                if(startDate && value && removeTimezone(value).isBefore(startDate)) {
                  callback('End date can not be before start date')
                }
                props.form.setFields({
                  dtStartDate: {
                    errors: null,
                    value: props.form.getFieldsValue().dtStartDate,
                  },
                })
                callback()
              },
            }],
          })(
            <DatePicker
              format='DD/MM/YYYY'
            />
          )}
        </FormItem>
        <Button key="submit" type="primary" size="default" onClick={props.search}>
          Search
        </Button>
    </Form>
    <span className="totalReferences">{`Number of References: ${props.totalReferences}`}</span>
  </div>
)}

export default SearchBar
