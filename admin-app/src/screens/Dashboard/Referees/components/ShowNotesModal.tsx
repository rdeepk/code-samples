import { Button, Modal } from 'antd'
import * as React from 'react'
import { IShowNotesModalProps, IShowNotesModalState } from './types'

class ShowNotesModal extends React.Component<IShowNotesModalProps> {
  public static getDerivedStateFromProps = (nextProps: IShowNotesModalProps, prevState: IShowNotesModalState) => ({
    isVisible: nextProps.isVisible
  })

  public state = {
    isVisible: this.props.isVisible
  }

  public render() {
    return (
      <Modal
        title="Notes"
        visible={this.state.isVisible}
        footer={[
          <Button key="back" onClick={this.handleCancel}>Close</Button>,
          <Button key="submit" type="primary" onClick={this.addNote}>
            Add Note
          </Button>
        ]}
      >
        <ul>
          {this.renderNotes()}
        </ul>
      </Modal>
    )
  }

  private addNote = () => {
    this.setState({
      isVisible: false
    }, () => {
      this.props.addNote(this.props.refereeId)
    })
  }

  private handleCancel = () => {
    this.setState({
      isVisible: false
    })
  }

  private renderNotes = () => {
    return this.props.notes.map((note, i) => <li key={i}>{note}</li>)
  }
}

export default ShowNotesModal