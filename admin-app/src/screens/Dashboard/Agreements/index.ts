
// import { makeLazy } from '@components/helpers'
import { agreementsActions as Actions, agreementsSelectors as Selectors } from '@store/Agreements'
import { IAgreement } from '@store/Agreements/types'
import { IAppState } from '@store/types'
import { userSelectors } from '@store/User'
import { logout } from '@store/User/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Agreements from './Agreements'

const mapStateToProps = (state: IAppState) => ({
  agreements: Selectors.getAgreements(state),
  isAdmin: () => userSelectors.isAdmin(state.user),
  isSuperAdmin: () => userSelectors.isSuperAdmin(state.user),
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAgreements: () => dispatch(Actions.fetchAgreements()),
  logout:() => dispatch(logout()),
  saveAgreement: (agreement: IAgreement) => dispatch(Actions.saveAgreement(agreement))
})

export { Agreements }

// @ts-ignore - TODO: Resolve issue with type not matching properly
export default connect(mapStateToProps, mapDispatchToProps)(Agreements)
