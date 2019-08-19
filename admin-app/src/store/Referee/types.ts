import { Action } from 'redux'

export enum RefereesActionTypeKeys {
  FetchReferees = '@@referees/FETCH',
  FetchRefereesPending = '@@referees/FETCH_PENDING',
  FetchRefereesSuccess = '@@referees/FETCH_SUCCESS',
  FetchRefereesFailure = '@@referees/FETCH_FAILURE',
  GetReferees = '@@referees/GET',
  ToggleActive = '@@referees/TOGGLE_ACTIVE',
  ToggleActiveFailure = '@@referees/TOGGLE_ACTIVE_FAILURE',
  AddNote = '@@referees/ADD_NOTE',
  AddNoteFailure = '@@referees/ADD_NOTE_FAILURE',
  DeleteReferee = '@@referees/DELETE_REFEREE'
}
export interface IReferee {
  RefereeID: string,
  active: boolean,
  RefereeName: string,
  Email: string,
  lastActive: Date,
  TotalReferences: number
}
export interface IRefereesCollection { [id: string]: IReferee }
export interface IRefereesState {
  error: Error | null
  isLoading: boolean
  refereeList: IRefereesCollection | null
}
export interface IFetchRefereesPendingAction extends Action {
  type: RefereesActionTypeKeys.FetchRefereesPending
}
export interface IFetchRefereesAction extends Action {
  type: RefereesActionTypeKeys.FetchReferees
  payload: {
    searchText: string
  }
}
export interface IFetchRefereesSuccessAction extends Action {
  type: RefereesActionTypeKeys.FetchRefereesSuccess
  referees: IRefereesCollection
}
export interface IFetchRefereesFailureAction extends Action {
  type: RefereesActionTypeKeys.FetchRefereesFailure
  error: Error
}
export interface IToggleActiveAction extends Action {
  type: RefereesActionTypeKeys.ToggleActive
  id: string
}
export interface IToggleActiveFailureAction extends Action {
  type: RefereesActionTypeKeys.ToggleActiveFailure
  error: Error
}
export interface IAddNoteAction extends Action {
  id: string
  text: string
  type: RefereesActionTypeKeys.AddNote
}
export interface IAddNoteFailureAction extends Action {
  type: RefereesActionTypeKeys.AddNoteFailure
  error: Error
}

export interface IDeleteRefereeAction extends Action {
  type: RefereesActionTypeKeys.DeleteReferee
  id: string
}

export type RefereesActionType =
  IFetchRefereesAction |
  IFetchRefereesPendingAction |
  IFetchRefereesSuccessAction |
  IFetchRefereesFailureAction |
  IToggleActiveAction |
  IToggleActiveFailureAction |
  IAddNoteAction |
  IAddNoteFailureAction |
  IDeleteRefereeAction