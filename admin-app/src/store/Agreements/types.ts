import { IAgreement } from '@services/Agreements/types'
import { Action } from 'redux'

export { IAgreement }
export interface IMappedAgreement {
  id: number
  type: number
  typeValue: string
  language: string
  terms: string
}

export interface IAgreementType {
  type: number
  typeValue: string
  agreements: ReadonlyArray<IMappedAgreement>
}

export enum AgreementsActionTypeKeys {
  FetchAgreements = '@@agreements/FETCH',
  FetchAgreementsPending = '@@agreements/FETCH_PENDING',
  FetchAgreementsSuccess = '@@agreements/FETCH_SUCCESS',
  FetchAgreementsFailure = '@@agreements/FETCH_FAILURE',
  SaveAgreement = '@@agreements/SAVE',
  SaveAgreementPending = '@@agreements/SAVE_PENDING',
  SaveAgreementSuccess = '@@agreements/SAVE_SUCCESS',
  SaveAgreementFailure = '@@agreements/SAVE_FAILURE',
}
export interface IAgreementsState {
  error: Error | null
  isLoading: boolean
  agreementsList: ReadonlyArray<{}> | null
}
export interface IFetchAgreementsAction extends Action {
  type: AgreementsActionTypeKeys.FetchAgreements
}
export interface IFetchAgreementsPendingAction extends Action {
  type: AgreementsActionTypeKeys.FetchAgreementsPending
}
export interface IFetchAgreementsSuccessAction extends Action {
  type: AgreementsActionTypeKeys.FetchAgreementsSuccess,
  agreements: ReadonlyArray<IAgreement>
}
export interface IFetchAgreementsFailureAction extends Action {
  type: AgreementsActionTypeKeys.FetchAgreementsFailure
  error: Error
}
export interface ISaveAgreementAction extends Action {
  type: AgreementsActionTypeKeys.SaveAgreement
  payload: {
    agreement: IAgreement
  }
}
export interface ISaveAgreementPendingAction extends Action {
  type: AgreementsActionTypeKeys.SaveAgreementPending
}
export interface ISaveAgreementSuccessAction extends Action {
  type: AgreementsActionTypeKeys.SaveAgreementSuccess
}
export interface ISaveAgreementFailureAction extends Action {
  type: AgreementsActionTypeKeys.SaveAgreementFailure
  error: Error
}

export type AgreementsActionType =
  IFetchAgreementsAction |
  IFetchAgreementsPendingAction |
  IFetchAgreementsSuccessAction |
  IFetchAgreementsFailureAction |
  ISaveAgreementAction |
  ISaveAgreementPendingAction |
  ISaveAgreementSuccessAction |
  ISaveAgreementFailureAction