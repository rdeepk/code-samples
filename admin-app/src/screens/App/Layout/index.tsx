import { checkSession, logout, setUserProfile } from '@src/store/User/actions'
import { IAppState } from '@store/types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Layout from './Layout'

const mapStateToProps = (state: IAppState) => ({
  isLoggedIn: state.user.isLoggedIn,
  profile: state.user.profile
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkSession: () => dispatch(checkSession()),
  logout:() => dispatch(logout()),
  setUserProfile: ()=> dispatch(setUserProfile())
})


// @ts-ignore - TODO: Resolve issue with type not matching properly
export default connect(mapStateToProps, mapDispatchToProps)(Layout)