import { IAppState } from '@store/types'
import {
  IReferee,
  IRefereesCollection,
  IRefereesState,
  RefereesActionType as ActionType,
  RefereesActionTypeKeys as Keys,
} from './types'

const initialState: IRefereesState = {
  error: null,
  isLoading: false,
  refereeList: {}
}

export default (state: IRefereesState = initialState, action: ActionType): IRefereesState => {
  switch (action.type) {
    case Keys.FetchRefereesSuccess:
      return { ...state, refereeList: action.referees, isLoading: false }
    case Keys.FetchRefereesPending:
      return { ...state, isLoading: true }
    case Keys.FetchRefereesFailure:
      return { ...state, error: action.error, isLoading: false }
    case Keys.ToggleActive:
      if (state.refereeList) state.refereeList[action.id].active = !state.refereeList[action.id].active
      return { ...state }
    case Keys.AddNote:
      if (state.refereeList) state.refereeList[action.id].notes.push(action.text)
      return state
    case Keys.DeleteReferee:
      if (state.refereeList) {
        const filteredKeys = Object.keys(state.refereeList).filter((key) => {
          return key !== action.id
        })
        const referees: IRefereesCollection = {}
        filteredKeys.forEach(key => {
          // @ts-ignore
          referees[key] = state.refereeList[key]
        })
        return { ...state, refereeList: referees }
      }
      return state
    default:
      return state
  }
}

export const filterReferees = (state: IAppState, searchText: string): ReadonlyArray<IReferee> => {
  if (!state.referees.refereeList) return []
  const referees = getReferees(state)
  const text = searchText.toLowerCase()
  return referees.filter((referee) => {
    return referee.RefereeName.toLowerCase().includes(text) || referee.Email.toLowerCase().includes(text)
  })
}

export const getReferees = (state: IAppState): ReadonlyArray<IReferee> => {
  if (!state.referees.refereeList) return []
  return Object.keys(state.referees.refereeList).map((index) => {
    // @ts-ignore: already checked for null
    return state.referees.refereeList[index]
  })
}
