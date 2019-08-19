import {
  UserActionType as ActionType,
  UserActionTypeKeys as Keys
} from './types'

export const login = (username: string, password: string): ActionType => ({
  payload: {
    password,
    username
  },
  type: Keys.Login
})

export const loginPending = (): ActionType => ({
  type: Keys.LoginPending
})

export const loginFailure = (error: Error): ActionType => ({
  error,
  payload: {
    message: error.message,
    success: false
  },
  type: Keys.LoginFailure
})

export const loginSuccess = (profile: {roles: string[]}): ActionType => ({
  payload: {
    profile,
    success: true
  },
  type: Keys.LoginSuccess
})

export const logout = (): ActionType => ({
  payload: {},
  type: Keys.Logout
})

export const logoutPending = (): ActionType => ({
  type: Keys.LogoutPending
})

export const logoutFailure = (error: Error): ActionType => ({
  error,
  payload: {
    message: error.message,
    success: false
  },
  type: Keys.LogoutFailure
})

export const logoutSuccess = (logoutResponse:{}): ActionType => ({
  payload: {
    logoutResponse,
    success: true
  },
  type: Keys.LogoutSuccess
})

export const checkSession = (): ActionType => ({
  payload: {},
  type: Keys.SessionCheck
})

export const sessionCheckPending = (): ActionType => ({
  type: Keys.SessionCheckPending
})

export const sessionCheckFailure = (error: Error): ActionType => ({
  error,
  payload: {
    message: error.message,
    success: false
  },
  type: Keys.SessionCheckFailure
})

export const sessionCheckSuccess = (session: false): ActionType => ({
  payload: {
    session,
    success: true
  },
  type: Keys.SessionCheckSuccess
})

export const setUserProfile = (): ActionType => ({
  payload: {},
  type: Keys.SetUserProfile
})

export const setUserProfilePending = (): ActionType => ({
  type: Keys.SetUserProfilePending
})

export const setUserProfileFailure = (error: Error): ActionType => ({
  error,
  payload: {
    message: error.message,
    success: false
  },
  type: Keys.SetUserProfileFailure
})

export const setUserProfileSuccess = (userProfile: { roles: string[]}): ActionType => ({
  payload: {
    success: true,
    userProfile,
  },
  type: Keys.SetUserProfileSuccess
})