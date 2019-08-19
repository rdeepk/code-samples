// import { IAppState } from '@store/types'
import {
  IUserState,
  UserActionType as ActionType,
  UserActionTypeKeys as Keys,
} from './types'

const initialState: IUserState = {
  isLoggedIn: false,
  loginError: undefined,
  logoutResponse: {},
  profile: {roles:[]},
}

export default (state: IUserState = initialState, action: ActionType): IUserState => {
  switch (action.type) {
    case Keys.LoginSuccess:
      const { profile } = action.payload
      return { ...state, isLoggedIn: true, profile }
    case Keys.LoginFailure:
      const { error } = action
      return { ...state, isLoggedIn: false, loginError: error }
    case Keys.SessionCheckPending:
      return { ...state }
    case Keys.SessionCheckSuccess:
      const { session } = action.payload
      return { ...state, isLoggedIn: session }
    case Keys.LogoutSuccess:
      const { logoutResponse } = action.payload
      return { ...state, logoutResponse, isLoggedIn: false }
    case Keys.SetUserProfileSuccess:
      const { userProfile } = action.payload
      return { ...state, profile: userProfile }
    default:
      return state
  }
}

export const isSuperAdmin = (state: IUserState) => {
  return  state.profile && state.profile.roles && state.profile.roles.includes('ROLE__SUPER_ADMIN')
}

export const isAdmin = (state: IUserState) => {
  return  state.profile && state.profile.roles && state.profile.roles.includes('ROLE__ADMIN')
}