import {
  ReferencesActionType as ActionType,
  ReferencesActionTypeKeys as Keys,
  IReferenceResponse
} from './types'

export const fetchReferences = (data: object): ActionType => ({
  payload: {
    data
  },
  type: Keys.FetchReferences
})

export const fetchReferencesFailure = (error: Error): ActionType => ({
  error,
  references: {
    references: {},
    pagination: {
      currentPage: 1,
      itemsNumber: undefined,
      pageSize: 50,
      pagesNumber: undefined,
    },
  },
  type: Keys.FetchReferencesFailure,
})

export const fetchReferencesPending = (): ActionType => ({
  type: Keys.FetchReferencesPending
})

export const fetchReferencesSuccess = (references: IReferenceResponse): ActionType => ({
  references,
  type: Keys.FetchReferencesSuccess
})

export const toggleReferenceActivation = (referenceId: number, operation: string): ActionType => ({
  payload: {
    referenceId,
    operation,
  },
  type: Keys.ToggleReferenceActivation
})

export const toggleReferenceActivationPending = (): ActionType => ({
  type: Keys.ToggleReferenceActivationPending
})

export const toggleReferenceActivationSuccess = (referenceId: number, operation: string): ActionType => ({
  payload: {
    referenceId,
    operation,
  },
  type: Keys.ToggleReferenceActivationSuccess
})

export const toggleReferenceActivationFailure = (error: Error): ActionType => ({
  error,
  type: Keys.ToggleReferenceActivationFailure
})

export const resetMessages = (): ActionType => ({
  type: Keys.ResetMessages
})
