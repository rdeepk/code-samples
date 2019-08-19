import { Action } from 'redux'

export enum UserActionTypeKeys {
  Login = '@@user/LOGIN',
  LoginPending = '@@user/LOGIN_PENDING',
  LoginSuccess = '@@user/LOGIN_SUCCESS',
  LoginFailure = '@@user/LOGIN_FAILURE',
  Logout = '@@user/LOGOUT',
  LogoutPending = '@@user/LOGOUT_PENDING',
  LogoutSuccess = '@@user/LOGOUT_SUCCESS',
  LogoutFailure = '@@user/LOGOUT_FAILURE',
  SessionCheck = '@@user/SESSION_CHECK',
  SessionCheckPending = '@@user/SESSION_CHECK_PENDING',
  SessionCheckSuccess = '@@user/SESSION_CHECK_SUCCESS',
  SessionCheckFailure = '@@user/SESSION_CHECK_FAILURE',
  SetUserProfile = '@@user/SET_USER_PROFILE',
  SetUserProfilePending = '@@user/SET_USER_PROFILE_PENDING',
  SetUserProfileSuccess = '@@user/SET_USER_PROFILE_SUCCESS',
  SetUserProfileFailure = '@@user/SET_USER_PROFILE_FAILURE',
}

export interface IUserState {
  isLoggedIn: boolean
  profile: { roles: string[]}
  loginError?: Error
  logoutResponse: {}
}

export interface ILoginAction extends Action {
  type: UserActionTypeKeys.Login
  payload: {
    username: string
    password: string
  }
}

export interface ILoginPendingAction extends Action {
  type: UserActionTypeKeys.LoginPending
}

export interface ILoginSuccessAction extends Action {
  type: UserActionTypeKeys.LoginSuccess
  payload: {
    profile: { roles: string[]}
    success: true
  }
}

export interface ILoginFailureAction extends Action {
  type: UserActionTypeKeys.LoginFailure
  payload: {}
  error?: Error
}

export interface ILogoutAction extends Action {
  type: UserActionTypeKeys.Logout
  payload: {}
}

export interface ILogoutPendingAction extends Action {
  type: UserActionTypeKeys.LogoutPending
}

export interface ILogoutSuccessAction extends Action {
  type: UserActionTypeKeys.LogoutSuccess
  payload: {
    logoutResponse: {}
    success: true
  }
}

export interface ILogoutFailureAction extends Action {
  type: UserActionTypeKeys.LogoutFailure
  payload: {}
  error?: Error
}

export interface ICheckSessionAction extends Action {
  type: UserActionTypeKeys.SessionCheck
  payload: { }
}

export interface ISessionCheckPendingAction extends Action {
  type: UserActionTypeKeys.SessionCheckPending
}

export interface ISessionCheckSuccessAction extends Action {
  type: UserActionTypeKeys.SessionCheckSuccess
  payload: {
    session: boolean
    success: true
  }
}

export interface ISessionCheckFailureAction extends Action {
  type: UserActionTypeKeys.SessionCheckFailure
  payload: {}
  error?: Error
}

export interface ISetUserProfileAction extends Action {
  type: UserActionTypeKeys.SetUserProfile
  payload: { }
}

export interface ISetUserProfilePendingAction extends Action {
  type: UserActionTypeKeys.SetUserProfilePending
}

export interface ISetUserProfileSuccessAction extends Action {
  type: UserActionTypeKeys.SetUserProfileSuccess
  payload: {
    userProfile:  { roles: string[]}
    success: true
  }
}

export interface ISetUserProfileFailureAction extends Action {
  type: UserActionTypeKeys.SetUserProfileFailure
  payload: {}
  error?: Error
}

export type UserActionType =
  ILoginAction |
  ILoginPendingAction |
  ILoginSuccessAction |
  ILoginFailureAction |
  ILogoutAction |
  ILogoutPendingAction |
  ILogoutSuccessAction |
  ILogoutFailureAction |
  ICheckSessionAction |
  ISessionCheckPendingAction |
  ISessionCheckSuccessAction |
  ISessionCheckFailureAction |
  ISetUserProfileAction |
  ISetUserProfilePendingAction |
  ISetUserProfileSuccessAction |
  ISetUserProfileFailureAction