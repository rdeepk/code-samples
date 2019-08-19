import * as ReferencesService from '@services/References'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as ReferencesActions from './actions'
import {
  ReferencesActionTypeKeys as Keys,
  IFetchReferencesAction,
  IToggleReferenceActivationAction
} from './types'

export function* fetchReferences(action: IFetchReferencesAction): SagaIterator {
  try {
    const { data } = action.payload
    yield put(ReferencesActions.fetchReferencesPending())
    const references = yield call(ReferencesService.fetchReferences, data)
    if(references.error) {
      yield put(ReferencesActions.fetchReferencesFailure(references.error))
    } else {
      yield put(ReferencesActions.fetchReferencesSuccess(references))
    }
  } catch (e) {
    yield put(ReferencesActions.fetchReferencesFailure(e))
  }
}

export function* toggleReferenceActivation(action: IToggleReferenceActivationAction): SagaIterator {
  try {
    const { referenceId, operation } = action.payload
    yield put(ReferencesActions.toggleReferenceActivationPending())
    let response
    if(operation === 'deactivate') {
      response = yield call(ReferencesService.deactivateReference, referenceId)
    } else {
      response = yield call(ReferencesService.reactivateReference, referenceId)
    }
    if(response.error) {
      yield put(ReferencesActions.toggleReferenceActivationFailure(response.error))
    }
    yield put(ReferencesActions.toggleReferenceActivationSuccess(referenceId, operation))
  } catch (e) {
    yield put(ReferencesActions.toggleReferenceActivationFailure(e))
  }
}

export function* resetMessages(): SagaIterator {
  yield put(ReferencesActions.resetMessages())
}

function* referencesSaga() {
  yield takeLatest(Keys.FetchReferences, fetchReferences)
  yield takeEvery(Keys.ToggleReferenceActivation, toggleReferenceActivation)
}

export default referencesSaga
