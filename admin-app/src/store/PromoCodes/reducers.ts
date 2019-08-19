import { IAppState } from '@store/types'
import {
  IPromoCode,
  IPromoCodesState,
  PromoCodesActionType as ActionType,
  PromoCodesActionTypeKeys as Keys,
} from './types'

const initialState: IPromoCodesState = {
  error: null,
  isLoading: false,
  promoCodeList: {}
}

export default (state: IPromoCodesState = initialState, action: ActionType): IPromoCodesState => {
  switch (action.type) {
    case Keys.FetchPromoCodesSuccess:
      return { ...state, error: null, promoCodeList: action.promoCodes, isLoading: false }
    case Keys.FetchPromoCodesPending:
      return { ...state, isLoading: true }
    case Keys.FetchPromoCodesFailure:
      return { ...state, error: action.error, isLoading: false }
    case Keys.SavePromoCodeSuccess:
      return { ...state, error: null, isLoading: false }
    case Keys.SavePromoCodePending:
      return { ...state, isLoading: true }
    case Keys.SavePromoCodeFailure:
      return { ...state, error: action.error, isLoading: false }
      case Keys.DeletePromoCodeSuccess:
      return { ...state, error: null, isLoading: false }
    case Keys.DeletePromoCodePending:
      return { ...state, isLoading: true }
    case Keys.DeletePromoCodeFailure:
      return { ...state, error: action.error, isLoading: false }
    default:
      return state
  }
}

export const getPromoCodes = (state: IAppState): ReadonlyArray<IPromoCode> => {
  if (!state.promoCodes.promoCodeList) return []
  return Object.keys(state.promoCodes.promoCodeList).map((index) => {
    // @ts-ignore: already checked for null
    return state.promoCodes.promoCodeList[index]
  })
}