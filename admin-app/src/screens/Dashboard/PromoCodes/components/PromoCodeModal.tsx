import dateHelper from '../../References/node_modules/@services/utils/formatDate'
import { IPromoCode } from '@store/PromoCodes/types'
import { Button, Col, DatePicker, Form, Input, Modal, Popconfirm, Radio, Row } from 'antd'
import moment from '../../References/node_modules/moment'
import * as React from 'react'
import { IPromoCodeModalProps} from './types'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { removeTimezone } = dateHelper

const PromoCodeModal = (props: IPromoCodeModalProps) => {
    const { getFieldDecorator, setFieldsValue } = props.form
    const { promoCodes } = props
    let promoCode
    if(promoCodes) {
      const filtered = promoCodes.filter((element) => {
        return element.id === props.codeId
      })
      promoCode = filtered[0]
    }
    const useType =  promoCode && promoCode.usageType && promoCode.usageType > 0 ? promoCode.usageType : 1
    const codeValue = promoCode && promoCode.code || ''
    const expiryDate = props.editMode && promoCode && promoCode.expiryDate && moment.utc(promoCode.expiryDate) || null
    let pointsValue = null
    if(promoCode && (promoCode.points || promoCode.points === 0)) {
      pointsValue = promoCode.points
    }
    const operation = props.editMode ? "Edit" : "Add"

    const disabledDate =(current: object) => {
      // Can not select days before today
      const DisabledDate = removeTimezone(moment()).subtract(1, 'days')
      return current && removeTimezone(current) <= DisabledDate
    }

    const handleOk = (e: object) => {
      // tslint:disable-next-line:no-any
        props.form.validateFields((err: Error, values: {
          txtPromoCode: string
          numPoints: string
          dtExpiryDate: object
          rdUsageType: number
        }) => {
          if (!err) {
            removeEditMode()
            const newPromoCode: IPromoCode = {
            code: values.txtPromoCode,
            createDate: '',
            points: parseInt((values.numPoints.substr(values.numPoints.length - 1) === '%' ? values.numPoints.substr(0, values.numPoints.length - 1) : values.numPoints), 10),
            expiryDate: removeTimezone(moment(values.dtExpiryDate)).format('YYYY-MM-DD'),
            id: props.codeId ? props.codeId : 0,
            usageType: values.rdUsageType,
          }
          props.savePromoCode(newPromoCode)
        }
      })
    }

    const handleCancel = () => {
      removeEditMode()
    }

    const removeEditMode = () => {
      props.form.resetFields()
      props.toggleVisible()
      props.setEditId(0)
    }

    const handleDelete = () => {
      props.deletePromoCode(props.codeId)
      removeEditMode()
    }
    return (
      <div>
        <Modal
          title={`${operation} Promo Code`}
          visible={props.isVisible}
          onCancel={handleCancel}
          footer={[
            <Row key={1}>
              <Col span={12}>
                {props.editMode &&
                <Popconfirm title="Are you sure you want to delete this promo code?" onConfirm={handleDelete}>
                <Button key="back" size="large" className="delete-button">Delete Promo Code</Button></Popconfirm>}
              </Col>
              <Col span={12} style={{ textAlign: 'right'}}>
                <Button key="back" size="large" onClick={handleCancel}>Cancel</Button>
                <Button key="submit" type="primary" size="large" onClick={handleOk}>
                  Save
                </Button>
              </Col>
              </Row>,
          ]}
        >
        <Row className="promoCodes">
          <Form layout="inline">
            <Col span={16}>
            <FormItem label="Promo Code" className="code">
              {getFieldDecorator('txtPromoCode', {
                initialValue: codeValue ? codeValue : '',
                rules: [{
                  message: 'Enter the promo code',
                  required: true,
                  whitespace: true,
                }, {
                  max: 50,
                  message: 'Enter a code between 2 to 50 characters',
                  min: 2 }],
              })(
                <Input id="txtpromoCode"
                disabled={props.editMode} />
              )}
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem label="Expiry Date">
            {getFieldDecorator('dtExpiryDate', {
                initialValue: expiryDate,
                rules: [{
                  message: 'Enter the expiry date',
                  required: true,
                },
                {
                  // tslint:disable-next-line:no-any
                  validator: (rule: any, value: object, callback: (msg?: string) => void) => {
                    if (removeTimezone(moment(value)).isBefore(removeTimezone(moment()), 'day')) {
                      callback('Expiry date should not be in the past.')
                    }
                    callback()
                  },
                }],
              })(
                <DatePicker
                  format='DD/MM/YYYY'
                  disabledDate={disabledDate}
                />
              )}
            </FormItem>
            </Col>
            <FormItem className="radio-button">
            {getFieldDecorator('rdUsageType', {
              initialValue: useType,
              rules: [{
                message: 'Choose usage type',
                required: true,
              }],
            })(
              <RadioGroup
                disabled={props.editMode}>
                <Radio value={1}>Single Use</Radio>
                <Radio value={2}>Multiple Use</Radio>
              </RadioGroup>
            )}
            </FormItem>
            <Col span={24}>
            <FormItem label="Points">
            {getFieldDecorator('numPoints', {
              initialValue: pointsValue || pointsValue === 0 ? `${pointsValue}%` : '%',
              rules: [{
                message: 'Enter the points',
                required: true,
              }, {
                // tslint:disable-next-line:no-any
                validator: (rule: any, value: string, callback: (msg?: string) => void) => {
                  if (value) {
                    setFieldsValue({ 'numPoints': value })
                    const points = parseFloat(value.substr(value.length - 1) === '%' ? value.substr(0, value.length - 1) : value)
                    if (points % 1 !== 0 || points < 0 || points > 100) {
                      callback('Enter a points between 0 to 100 with no decimal places')
                    }
                    callback()
                  }
                  callback()
                },
              }],
              validateFirst: true,
            })(
              <Input id="txtpoints"
              disabled={props.editMode}
              />
              )}
            </FormItem>
            </Col>
          </Form>
          </Row>
        </Modal>
      </div>
    )
}

export default PromoCodeModal
