import { IAppState } from '@store/types'
import { login } from '@store/User/actions'
import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Login from './Login'

const mapStateToProps = (state: IAppState) => ({
  isLoggedIn: state.user.isLoggedIn,
  loginError: state.user.loginError
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (username: string, password: string) => dispatch(login(username, password))
})

// FIXME: Not sure if casting to ComponentType is the right thing to do.
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Login as ComponentType)
