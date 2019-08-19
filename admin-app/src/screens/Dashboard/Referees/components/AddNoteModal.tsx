import { Input, Modal } from 'antd'
import * as React from 'react'
import { IAddNoteModalProps, IAddNoteModalState } from './types'

const { TextArea } = Input

class AddNoteModal extends React.Component<IAddNoteModalProps> {
  public static getDerivedStateFromProps = (nextProps: IAddNoteModalProps, prevState: IAddNoteModalState) => ({
    isVisible: nextProps.isVisible
  })

  public state = {
    isVisible: this.props.isVisible,
    note: ''
  }

  public render() {
    return (
      <Modal
        title="Add Note"
        visible={this.state.isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <TextArea rows={4} placeholder="Add Note" autosize={true} onChange={this.onChange} value={this.state.note} />
      </Modal>
    )
  }

  private handleOk = () => {
    this.props.addNote(this.props.refereeId, this.state.note)
    this.setState({
      isVisible: false,
      note: ''
    })
  }

  private handleCancel = () => {
    this.setState({
      isVisible: false,
      note: ''
    })
  }

  private onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ note: e.target.value })
}

export default AddNoteModal