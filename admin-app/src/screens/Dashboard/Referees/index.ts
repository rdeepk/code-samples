import { addNote, deleteReferee, fetchReferees, toggleActive } from '@store/Referees/actions'
import * as Selectors from '@store/Referees/reducers'
import { IAppState } from '@store/types'
import { userSelectors } from '@store/User'
import { logout } from '@store/User/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Referees from './Referees'

const mapStateToProps = (state: IAppState) => ({
  // filterReferees: (searchText: string) => Selectors.filterReferees(state, searchText),
  getReferees: () => Selectors.getReferees(state),
  isAdmin: () => userSelectors.isAdmin(state.user),
  isSuperAdmin: () => userSelectors.isSuperAdmin(state.user),
  referees: Selectors.getReferees(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: (id: string, note: string) => dispatch(addNote(id, note)),
  deleteReferee: (id: string) => dispatch(deleteReferee(id)),
  fetchReferees: (searchText: string) => dispatch(fetchReferees(searchText)),
  logout:() => dispatch(logout()),
  toggleActive: (id: string) => dispatch(toggleActive(id))
})

export { Referees }

// @ts-ignore - TODO: Resolve issue with type not matching properly
export default connect(mapStateToProps, mapDispatchToProps)(Referees)