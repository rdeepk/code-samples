import * as AgreementsService from '@services/Agreements'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as AgreementsActions from './actions'
import {
  AgreementsActionTypeKeys as Keys,
  IFetchAgreementsAction,
  ISaveAgreementAction
} from './types'

export function* fetchAgreements(action: IFetchAgreementsAction): SagaIterator {
  try {
    yield put(AgreementsActions.fetchAgreementsPending())
    const Agreements = yield call(AgreementsService.fetchAgreements)
    yield put(AgreementsActions.fetchAgreementsSuccess(Agreements))
  } catch (e) {
    yield put(AgreementsActions.fetchAgreementsFailure(e))
  }
}

export function* saveAgreement(action: ISaveAgreementAction): SagaIterator {
  try {
    const { agreement } = action.payload
    yield put(AgreementsActions.saveAgreementPending())
    yield call(AgreementsService.saveAgreement, agreement)
    yield put(AgreementsActions.saveAgreementSuccess())
    const Agreements = yield call(AgreementsService.fetchAgreements)
    yield put(AgreementsActions.fetchAgreementsSuccess(Agreements))
  } catch (e) {
    yield put(AgreementsActions.saveAgreementFailure(e))
  }
}

function* agreementsSaga() {
  yield takeLatest(Keys.FetchAgreements, fetchAgreements)
  yield takeEvery(Keys.SaveAgreement, saveAgreement)
}

export default agreementsSaga