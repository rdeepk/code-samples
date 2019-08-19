import { IReferenceResponse } from '@store/References/types'

export interface IReferencesProps {
  error: string
  references: IReferenceResponse
  fetchReferences: (data: object) => void
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
  logout: () => void
  resetMessages: () => void
  toggleReferenceActivation: (referenceId: number, operation: string) => void
  toggleStateError: string
  toggleStateSuccess: string | null
}

export interface IReferencesState {
  references: IReferenceResponse
  sortColumn: string
  sortDirection: string
}
