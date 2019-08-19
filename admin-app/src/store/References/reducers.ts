import { IAppState } from '@store/types'
import {
  ReferencesActionType as ActionType,
  ReferencesActionTypeKeys as Keys,
  IReferenceResponse,
  IReferencesState,
} from './types'

const initialState: IReferencesState = {
  error: null,
  references: {
    references: {},
    pagination: {
      currentPage: 1,
      itemsNumber: undefined,
      pageSize: 50,
      pagesNumber: undefined,
    },
  },
  isLoading: false,
  toggleStateError: null,
  toggleStateSuccess: null,
}

export default (state: IReferencesState = initialState, action: ActionType): IReferencesState => {
  switch (action.type) {
    case Keys.FetchReferencesSuccess:
      return { ...state, references: action.references, error:null, isLoading: false }
    case Keys.FetchReferencesPending:
      return { ...state, isLoading: true }
    case Keys.FetchReferencesFailure:
      return { ...state, error: action.error, references: action.references, isLoading: false }
    case Keys.ToggleReferenceActivationSuccess:
      const { referenceId, operation } = action.payload
      let message = null
      if(Array.isArray(state.references.references)) {
        const idx = state.references.references.findIndex((key) => {
          return key.referenceId === referenceId
        })
        switch(operation) {
          case 'deactivate':
            state.references.references[idx].state = 'deactivated'
            message = 'Reference successfully deactivated.'
            break
          case 'reactivate':
            state.references.references[idx].state = 'draft'
            message = 'Reference successfully reactivated and changed to draft.'
            break
        }
      }
    return { ...state, toggleStateError: null, toggleStateSuccess: message }
    case Keys.ToggleReferenceActivationFailure:
      return { ...state, toggleStateError: action.error, toggleStateSuccess: null }
    case Keys.ResetMessages:
      return { ...state, toggleStateError: null, toggleStateSuccess: null}
    default:
      return state
  }
}

export const getReferences = (state: IAppState): IReferenceResponse => {
  return state.references.references
}
