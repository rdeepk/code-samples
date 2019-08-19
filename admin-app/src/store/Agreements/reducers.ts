import { IAppState } from '@store/types'
import {
  AgreementsActionType as ActionType,
  AgreementsActionTypeKeys as Keys,
  IAgreementsState,
  IAgreementType,
  IMappedAgreement,
} from './types'

const initialState: IAgreementsState = {
  agreementsList: [],
  error: null,
  isLoading: false
}

export default (state: IAgreementsState = initialState, action: ActionType): IAgreementsState => {
  switch (action.type) {
    case Keys.FetchAgreementsSuccess:
      return { ...state, agreementsList: action.agreements, isLoading: false }
    case Keys.FetchAgreementsPending:
      return { ...state, isLoading: true }
    case Keys.FetchAgreementsFailure:
      return { ...state, error: action.error, isLoading: false }
    case Keys.SaveAgreementSuccess:
      return { ...state, isLoading: false }
    case Keys.SaveAgreementPending:
      return { ...state, isLoading: true }
    case Keys.SaveAgreementFailure:
      return { ...state, error: action.error, isLoading: false }
    default:
      return state
  }
}

export const getAgreements = (state: IAppState): ReadonlyArray<IAgreementType> => {
  if (!state.agreements.agreementsList) return []
  const agreements = {}
  state.agreements.agreementsList.forEach((agreement: IMappedAgreement) => {
    if (!agreements[agreement.type]) {
      agreements[agreement.type] = {
        agreements: [agreement],
        type: agreement.type,
        typeValue: agreement.typeValue
      }
    } else {
      agreements[agreement.type].agreements.push(agreement)
    }
  })

  return Object.keys(agreements).map((index) => {
    return agreements[index]
  })
}
