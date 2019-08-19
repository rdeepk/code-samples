import {
  AgreementsActionType as ActionType,
  AgreementsActionTypeKeys as Keys,
  IAgreement
} from './types'

export const fetchAgreements = (): ActionType => ({
  type: Keys.FetchAgreements,
})

export const fetchAgreementsFailure = (error: Error): ActionType => ({
  error,
  type: Keys.FetchAgreementsFailure
})

export const fetchAgreementsPending = (): ActionType => ({
  type: Keys.FetchAgreementsPending
})

export const fetchAgreementsSuccess = (agreements: ReadonlyArray<IAgreement>): ActionType => ({
  agreements,
  type: Keys.FetchAgreementsSuccess
})

export const saveAgreement = (agreement: IAgreement): ActionType => ({
  payload: {
    agreement
  },
  type: Keys.SaveAgreement,
})

export const saveAgreementFailure = (error: Error): ActionType => ({
  error,
  type: Keys.SaveAgreementFailure
})

export const saveAgreementPending = (): ActionType => ({
  type: Keys.SaveAgreementPending
})

export const saveAgreementSuccess = (): ActionType => ({
  type: Keys.SaveAgreementSuccess
})