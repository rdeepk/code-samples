import { IReferenceResponse } from '@store/References/types'

export interface IReferenceListProps {
  currentPage: number
  references: IReferenceResponse
  error?: string
  getReferencesData: (pagination?: object, sorter?: object) => void
  pageSize: number
  resetMessages: () => void
  totalReferences: number | undefined
  toggleReferenceActivation: (referenceId: number, operation: string) => void
  toggleStateError: string
  toggleStateSuccess: string | null
}

export interface ISearchBarProps {
  search: () => void
  totalReferences: number | undefined
  form: {
    // tslint:disable-next-line:no-any
    getFieldDecorator: (name: string, func: any) => any
    // tslint:disable-next-line:no-any
    getFieldsValue: () => any
    setFields: (obj: object) => void
  }
}
