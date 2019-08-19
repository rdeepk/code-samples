import {
  IPromoCode,
  IPromoCodesCollection,
  PromoCodesActionType as ActionType,
  PromoCodesActionTypeKeys as Keys
} from './types'

export const fetchPromoCodes = (searchText: string): ActionType => ({
  payload: {
    searchText,
  },
  type: Keys.FetchPromoCodes,
})

export const fetchPromoCodesFailure = (error: Error): ActionType => ({
  error,
  type: Keys.FetchPromoCodesFailure
})

export const fetchPromoCodesPending = (): ActionType => ({
  type: Keys.FetchPromoCodesPending
})

export const fetchPromoCodesSuccess = (promoCodes: IPromoCodesCollection): ActionType => ({
  promoCodes,
  type: Keys.FetchPromoCodesSuccess
})

export const savePromoCode = (promoCode: IPromoCode): ActionType => ({
  payload: {
    promoCode,
  },
  type: Keys.SavePromoCode,
})

export const savePromoCodeFailure = (error: Error): ActionType => ({
  error,
  type: Keys.SavePromoCodeFailure
})

export const savePromoCodePending = (): ActionType => ({
  type: Keys.SavePromoCodePending
})

export const savePromoCodeSuccess = (): ActionType => ({
  type: Keys.SavePromoCodeSuccess
})

export const deletePromoCode = (promoCodeId: number): ActionType => ({
  payload: {
    promoCodeId,
  },
  type: Keys.DeletePromoCode,
})

export const deletePromoCodeFailure = (error: Error): ActionType => ({
  error,
  type: Keys.DeletePromoCodeFailure
})

export const deletePromoCodePending = (): ActionType => ({
  type: Keys.DeletePromoCodePending
})

export const deletePromoCodeSuccess = (): ActionType => ({
  type: Keys.DeletePromoCodeSuccess
})