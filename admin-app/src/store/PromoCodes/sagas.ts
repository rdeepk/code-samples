import * as PromoCodesService from '@services/PromoCodes'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as PromoCodesActions from './actions'
import {
  IDeletePromoCodeAction,
  IFetchPromoCodesAction,
  ISavePromoCodeAction,
  PromoCodesActionTypeKeys as Keys
} from './types'

export function* fetchPromoCodes(action: IFetchPromoCodesAction): SagaIterator {
  try {
    const { searchText } = action.payload
    yield put(PromoCodesActions.fetchPromoCodesPending())
    const promoCodes = yield call(PromoCodesService.fetchPromoCodes, searchText)
    yield put(PromoCodesActions.fetchPromoCodesSuccess(promoCodes.promoCode))
  } catch (e) {
    yield put(PromoCodesActions.fetchPromoCodesFailure(e))
  }
}

export function* savePromoCode(action: ISavePromoCodeAction): SagaIterator {
  try {
    const { promoCode } = action.payload
    yield put(PromoCodesActions.savePromoCodePending())
    const response = yield call(PromoCodesService.savePromoCode, promoCode)
    if(response.error) {
      yield put(PromoCodesActions.savePromoCodeFailure(response.error))
    } else {
      yield put(PromoCodesActions.savePromoCodeSuccess())
      const promoCodes = yield call(PromoCodesService.fetchPromoCodes, '')
      yield put(PromoCodesActions.fetchPromoCodesSuccess(promoCodes.promoCode))
    }
  } catch (e) {
    yield put(PromoCodesActions.savePromoCodeFailure(e))
  }
}

export function* deletePromoCode(action: IDeletePromoCodeAction): SagaIterator {
  try {
    const { promoCodeId } = action.payload
    yield put(PromoCodesActions.deletePromoCodePending())
    yield call(PromoCodesService.deletePromoCode, promoCodeId)
    yield put(PromoCodesActions.deletePromoCodeSuccess())
    const promoCodes = yield call(PromoCodesService.fetchPromoCodes, '')
    yield put(PromoCodesActions.fetchPromoCodesSuccess(promoCodes.promoCode))
  } catch (e) {
    yield put(PromoCodesActions.deletePromoCodeFailure(e))
  }
}

function* promoCodesSaga() {
  yield takeLatest(Keys.FetchPromoCodes, fetchPromoCodes)
  yield takeEvery(Keys.SavePromoCode, savePromoCode)
  yield takeEvery(Keys.DeletePromoCode, deletePromoCode)
}

export default promoCodesSaga