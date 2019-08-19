import * as UserService from '@services/User'
import { CookieHelper } from '@src/services/utils'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from './actions'
import {
  ILoginAction,
  UserActionTypeKeys as Keys
} from './types'

export function* login(action: ILoginAction): SagaIterator {
  try {
    const { username, password } = action.payload
    yield put(Actions.loginPending())
    const profile = yield call(UserService.login, username, password)
    console.log('profile', profile)
    if(profile.error) {
      yield put(Actions.loginFailure(profile.error))
    } else {
      yield put(Actions.loginSuccess(profile))
    }
  } catch (e) {
    yield put(Actions.loginFailure(e))
  }
}

export function* checkSession() {
  try {
    const { checkSessionCookie } = CookieHelper
    yield put(Actions.sessionCheckPending())
    const session =  yield call(checkSessionCookie)
    yield put(Actions.sessionCheckSuccess(session.success))
  } catch (e) {
    yield put(Actions.sessionCheckFailure(e))
  }  
}

export function* logout() {
  try {
    yield put(Actions.logoutPending())
    const { clearSessionCookie } = CookieHelper
    yield call(clearSessionCookie)
    const logoutResponse = yield call(UserService.logout)
    yield put(Actions.logoutSuccess(logoutResponse))
  } catch (e) {
    yield put(Actions.logoutFailure(e))
  }  
}

export function* setUserProfile() {
  try {
    const { getAppCookieValue } = CookieHelper
    yield put(Actions.setUserProfilePending())
    const profile =  yield call(getAppCookieValue, 'adminuser')
    yield put(Actions.setUserProfileSuccess(profile.retrievedCookie))
  } catch (e) {
    yield put(Actions.setUserProfileFailure(e))
  }  
}

function* usersSaga() {
  yield takeLatest(Keys.Login, login)
  yield takeLatest(Keys.SessionCheck, checkSession)
  yield takeLatest(Keys.Logout, logout)
  yield takeLatest(Keys.SetUserProfile, setUserProfile)
//  yield takeEvery(Keys.AddNote, addNote)
//  yield takeEvery(Keys.ToggleActive, toggleActive)
}

export default usersSaga