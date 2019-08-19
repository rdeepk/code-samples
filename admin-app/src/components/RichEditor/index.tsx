import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import Draft, {
  draftToHtml,
  htmlToDraft
} from 'hake-draft'
import * as React from 'react'

const FormItem = Form.Item

interface IRichEditorProps {
  agreementTitle: string
  text: string
  setAgreementText: (text: object) => void
}

export default class extends React.Component<IRichEditorProps & FormComponentProps> {
  public state = {
    editorState: htmlToDraft(this.props.text)
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem label={`Edit ${this.props.agreementTitle}`}
        wrapperCol={{ span: 24 }}>
        {getFieldDecorator('Content', {
          rules: [{ required: true, message: 'Please leave a message...' }],
        })(
          <Draft
            editorState={this.state.editorState}
            onEditorStateChange={this.stateChange}
            locale='en'
            toolbar={{
              options:['inline', 'link', 'fontSize', 'list'],
            }}
          />
        )}
      </FormItem>
    )
  }

  private stateChange = (editorState: object) => {
    this.setState({ editorState })
    this.props.form.validateFields((err, data) => {
      if (err) {
        return
      }
      if (data.Content) {
        data.Content = draftToHtml(data.Content)
        // remove new line character in the end
        this.props.setAgreementText(data.Content.replace(/\n$/, ""))
      }
    })
  }

}
