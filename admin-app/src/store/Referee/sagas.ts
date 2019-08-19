import * as RefereesService from '@services/Referees'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as RefereesActions from './actions'
import {
  IAddNoteAction,
  IFetchRefereesAction,
  IToggleActiveAction,
  RefereesActionTypeKeys as Keys
} from './types'

export function* fetchReferees(action: IFetchRefereesAction): SagaIterator {
  try {
    const { payload } = action
    let searchText = ''
    if(payload) {
      searchText = payload.searchText
    }
    yield put(RefereesActions.fetchRefereesPending())
    const referees = yield call(RefereesService.fetchReferees, searchText)
    yield put(RefereesActions.fetchRefereesSuccess(referees))
  } catch (e) {
    yield put(RefereesActions.fetchRefereesFailure(e))
  }
}

// TODO: What is the best way to update the Referee on the backend with changes to notes/active?

export function* addNote(action: IAddNoteAction): SagaIterator {
  const { id, text } = action
  try {
    yield call(RefereesService.addNote, {
      id,
      text
    })
    yield put(RefereesActions.addNote(id, text))
  } catch (e) {
    yield put(RefereesActions.addNoteFailure(e))
  }
}

export function* toggleActive(action: IToggleActiveAction): SagaIterator {
  const { id } = action
  try {
    yield call(RefereesService.toggleActive, id)
    yield put(RefereesActions.toggleActive(id))
  } catch (e) {
    yield put(RefereesActions.toggleActiveFailure(e))
  }
}

function* refereesSaga() {
  yield takeLatest(Keys.FetchReferees, fetchReferees)
//  yield takeEvery(Keys.AddNote, addNote)
//  yield takeEvery(Keys.ToggleActive, toggleActive)
}

export default refereesSaga
