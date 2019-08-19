import { Action } from 'redux'

export enum PromoCodesActionTypeKeys {
  FetchPromoCodes = '@@promoCodes/FETCH',
  FetchPromoCodesPending = '@@promoCodes/FETCH_PENDING',
  FetchPromoCodesSuccess = '@@promoCodes/FETCH_SUCCESS',
  FetchPromoCodesFailure = '@@promoCodes/FETCH_FAILURE',
  GetPromoCodes = '@@promoCodes/GET',
  SavePromoCode = '@@promoCodes/SAVE',
  SavePromoCodePending = '@@promoCodes/SAVE_PENDING',
  SavePromoCodeSuccess = '@@promoCodes/SAVE_SUCCESS',
  SavePromoCodeFailure = '@@promoCodes/SAVE_FAILURE',
  DeletePromoCode = '@@promoCodes/DELETE',
  DeletePromoCodePending = '@@promoCodes/DELETE_PENDING',
  DeletePromoCodeSuccess = '@@promoCodes/DELETE_SUCCESS',
  DeletePromoCodeFailure = '@@promoCodes/DELETE_FAILURE',
}
export interface IPromoCode {
  id: number,
  code: string,
  points: number | null,
  createDate: string,
  expiryDate: string,
  usageType: number
}
export interface IPromoCodesCollection { [id: string]: IPromoCode }

export interface IPromoCodesState {
  error: Error | null
  isLoading: boolean
  promoCodeList: IPromoCodesCollection | null
}
export interface IFetchPromoCodesPendingAction extends Action {
  type: PromoCodesActionTypeKeys.FetchPromoCodesPending
}
export interface IFetchPromoCodesAction extends Action {
  type: PromoCodesActionTypeKeys.FetchPromoCodes
  payload: {
    searchText: string
  }
}
export interface IFetchPromoCodesSuccessAction extends Action {
  type: PromoCodesActionTypeKeys.FetchPromoCodesSuccess
  promoCodes: IPromoCodesCollection
}
export interface IFetchPromoCodesFailureAction extends Action {
  type: PromoCodesActionTypeKeys.FetchPromoCodesFailure
  error: Error
}

export interface ISavePromoCodePendingAction extends Action {
  type: PromoCodesActionTypeKeys.SavePromoCodePending
}
export interface ISavePromoCodeAction extends Action {
  type: PromoCodesActionTypeKeys.SavePromoCode
  payload: {
    promoCode: IPromoCode
  }
}
export interface ISavePromoCodeSuccessAction extends Action {
  type: PromoCodesActionTypeKeys.SavePromoCodeSuccess
}
export interface ISavePromoCodeFailureAction extends Action {
  type: PromoCodesActionTypeKeys.SavePromoCodeFailure
  error: Error
}

export interface IDeletePromoCodePendingAction extends Action {
  type: PromoCodesActionTypeKeys.DeletePromoCodePending
}
export interface IDeletePromoCodeAction extends Action {
  type: PromoCodesActionTypeKeys.DeletePromoCode
  payload: {
    promoCodeId: number
  }
}
export interface IDeletePromoCodeSuccessAction extends Action {
  type: PromoCodesActionTypeKeys.DeletePromoCodeSuccess
}
export interface IDeletePromoCodeFailureAction extends Action {
  type: PromoCodesActionTypeKeys.DeletePromoCodeFailure
  error: Error
}

export type PromoCodesActionType =
  IFetchPromoCodesAction |
  IFetchPromoCodesPendingAction |
  IFetchPromoCodesSuccessAction |
  IFetchPromoCodesFailureAction |
  ISavePromoCodePendingAction |
  ISavePromoCodeAction |
  ISavePromoCodeSuccessAction |
  ISavePromoCodeFailureAction |
  IDeletePromoCodePendingAction |
  IDeletePromoCodeAction |
  IDeletePromoCodeSuccessAction |
  IDeletePromoCodeFailureAction