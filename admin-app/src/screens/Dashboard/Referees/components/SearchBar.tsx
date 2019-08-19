import { Form, Input } from 'antd'
import * as React from 'react'
import { ISearchBarProps } from './types'

const FormItem = Form.Item
const Search = Input.Search

const SearchBar = (props: ISearchBarProps) => (
  <div>
    <Form>
      <FormItem>
        <Search
          placeholder="Search By Name or Email"
          onSearch={props.search}
          enterButton={true}
        />
      </FormItem>
    </Form>
  </div>
)

export default SearchBar