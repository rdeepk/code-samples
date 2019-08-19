import { Action } from 'redux'

export enum ReferencesActionTypeKeys {
  FetchReferences = '@@references/FETCH',
  FetchReferencesPending = '@@references/FETCH_PENDING',
  FetchReferencesSuccess = '@@references/FETCH_SUCCESS',
  FetchReferencesFailure = '@@references/FETCH_FAILURE',
  ToggleReferenceActivation = '@@reference/TOGGLE_ACTIVE',
  ToggleReferenceActivationPending = '@@reference/TOGGLE_ACTIVE_PENDING',
  ToggleReferenceActivationSuccess = '@@reference/TOGGLE_ACTIVE_SUCCESS',
  ToggleReferenceActivationFailure = '@@reference/TOGGLE_ACTIVE_FAILURE',
  ResetMessages = '@@references/RESET_MESSAGES'
}

export interface IReference {
  referenceId: number
  refereeName: string
  referenceDate: string,
  state: string,
}

export interface IPagination {
  currentPage: number,
  pageSize: number,
  pagesNumber: number | undefined,
  itemsNumber: number | undefined
}

export interface IReferenceResponse {
  references: IReferencesCollection
  pagination: IPagination
}

export interface IReferencesCollection { [id: string]: IReference }

export interface IReferencesState {
  error: Error | null
  toggleStateError: Error | null
  toggleStateSuccess: string | null
  isLoading: boolean
  references: IReferenceResponse
}
export interface IFetchReferencesAction extends Action {
  type: ReferencesActionTypeKeys.FetchReferences
  payload: {
    data: object
  }
}
export interface IFetchReferencesPendingAction extends Action {
  type: ReferencesActionTypeKeys.FetchReferencesPending
}
export interface IFetchReferencesSuccessAction extends Action {
  type: ReferencesActionTypeKeys.FetchReferencesSuccess,
  references: IReferenceResponse
}
export interface IFetchReferencesFailureAction extends Action {
  type: ReferencesActionTypeKeys.FetchReferencesFailure
  error: Error
  references: {
    references: {},
    pagination: {
      currentPage: number
      itemsNumber: number | undefined,
      pageSize: number,
      pagesNumber: number | undefined,
    },
  },
}

export interface IToggleReferenceActivationAction extends Action {
  type: ReferencesActionTypeKeys.ToggleReferenceActivation
  payload: {
    referenceId: number
    operation: string
  }
}
export interface IToggleReferenceActivationPendingAction extends Action {
  type: ReferencesActionTypeKeys.ToggleReferenceActivationPending
}
export interface IToggleReferenceActivationSuccessAction extends Action {
  type: ReferencesActionTypeKeys.ToggleReferenceActivationSuccess,
  payload: {
    referenceId: number
    operation: string
  }
}

export interface IToggleReferenceActivationFailureAction extends Action {
  type: ReferencesActionTypeKeys.ToggleReferenceActivationFailure,
  error: Error
}

export interface IResetMessagesAction extends Action {
  type: ReferencesActionTypeKeys.ResetMessages
}

export type ReferencesActionType =
  IFetchReferencesAction |
  IFetchReferencesPendingAction |
  IFetchReferencesSuccessAction |
  IFetchReferencesFailureAction |
  IResetMessagesAction |
  IToggleReferenceActivationAction |
  IToggleReferenceActivationPendingAction |
  IToggleReferenceActivationSuccessAction |
  IToggleReferenceActivationFailureAction
