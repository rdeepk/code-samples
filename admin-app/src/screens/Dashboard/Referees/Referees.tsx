import Loader from '@components/Loader'
import { redirectLogin } from '@services/utils/auth'
import * as React from 'react'
import {
  AddNoteModal,
  RefereesList,
  SearchBar,
  ShowNotesModal
} from './components'
import { IRefereesProps, IRefereesState } from './types'

class Referees extends React.Component<IRefereesProps> {
  public static getDerivedStateFromProps = (nextProps: IRefereesProps, prevState: IRefereesState) => ({
    referees: nextProps.referees
  })

  public state: IRefereesState = {
    addNoteModal: {
      isVisible: false,
      refereeId: ''
    },
    referees: this.props.referees,
    showNotesModal: {
      isVisible: false,
      notes: [],
      refereeId: ''
    },
  }

  public componentDidMount() {
    if(this.props.isSuperAdmin() || this.props.isAdmin()) {
      this.props.fetchReferees('')
    } else {
      this.props.logout()
      redirectLogin()
    }
  }

  public render() {
    const { addNoteModal, showNotesModal, referees } = this.state
    if (!referees) return <Loader />
    return (
      <div>
        <SearchBar search={this.search} />
        <RefereesList
          referees={referees}
          addNote={this.showAddNoteModal}
          showNotes={this.showNotesModal}
          toggleActive={this.props.toggleActive}
          deleteReferee={this.props.deleteReferee}
          />
        <AddNoteModal
          isVisible={addNoteModal.isVisible}
          refereeId={addNoteModal.refereeId}
          addNote={this.props.addNote} />
        <ShowNotesModal
          isVisible={showNotesModal.isVisible}
          notes={showNotesModal.notes}
          addNote={this.showAddNoteModal}
          refereeId={showNotesModal.refereeId} />
      </div>
    )
  }

  private search = (searchText: string) => {
    const referees = this.props.fetchReferees(searchText)
    this.setState({
      referees
    })
  }

  private showAddNoteModal = (refereeId: string) => {
    this.setState({
      addNoteModal: {
        isVisible: true,
        refereeId,
      }
    })
  }

  private showNotesModal = (refereeId: string, notes: string[]) => {
    this.setState({
      showNotesModal: {
        isVisible: true,
        notes,
        refereeId
      }
    })
  }
}

export default Referees
