import {
  IRefereesCollection,
  RefereesActionType as ActionType,
  RefereesActionTypeKeys as Keys
} from './types'

export const addNote = (id: string, text: string): ActionType => ({
  id,
  text,
  type: Keys.AddNote
})

export const addNoteFailure = (error: Error): ActionType => ({
  error,
  type: Keys.AddNoteFailure
})

export const fetchReferees = (searchText: string): ActionType => ({
  payload: {
    searchText,
  },
  type: Keys.FetchReferees,
})

export const fetchRefereesFailure = (error: Error): ActionType => ({
  error,
  type: Keys.FetchRefereesFailure
})

export const fetchRefereesPending = (): ActionType => ({
  type: Keys.FetchRefereesPending
})

export const fetchRefereesSuccess = (referees: IRefereesCollection): ActionType => ({
  referees,
  type: Keys.FetchRefereesSuccess
})

export const toggleActive = (id: string): ActionType => ({
  id,
  type: Keys.ToggleActive
})

export const deleteReferee = (id: string): ActionType => ({
  id,
  type: Keys.DeleteReferee
})

export const toggleActiveFailure = (error: Error): ActionType => ({
  error,
  type: Keys.ToggleActiveFailure
})