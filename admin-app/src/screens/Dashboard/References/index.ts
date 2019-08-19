
import { referencesActions as Actions, referencesSelectors as Selectors } from '@store/References'
import { IAppState } from '@store/types'
import { userSelectors } from '@store/User'
import { logout } from '@store/User/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import References from './References'

const mapStateToProps = (state: IAppState) => ({
  error: state.references.error,
  references: Selectors.getReferences(state),
  isAdmin: () => userSelectors.isAdmin(state.user),
  isSuperAdmin: () => userSelectors.isSuperAdmin(state.user),
  toggleStateError: state.references.toggleStateError,
  toggleStateSuccess: state.references.toggleStateSuccess,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchReferences: (data: object) => dispatch(Actions.fetchReferences(data)),
  logout:() => dispatch(logout()),
  resetMessages: () => dispatch(Actions.resetMessages()),
  toggleReferenceActivation:(referenceId: number, operation: string) => dispatch(Actions.toggleReferenceActivation(referenceId, operation))
})

// @ts-ignore - TODO: Resolve issue with type not matching properly
export default connect(mapStateToProps, mapDispatchToProps)(References)
