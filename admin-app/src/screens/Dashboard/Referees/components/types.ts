import { IReferee } from '@store/Referees/types'

export interface IAddNoteModalProps {
  isVisible: boolean
  addNote: (id: string, note: string) => void
  refereeId: string
}

export interface IAddNoteModalState {
  isVisible: boolean
  note: string
}

export interface IRefereesListProps {
  addNote: (refereeId: string) => void
  referees: ReadonlyArray<IReferee>
  showNotes: (refereeId: string, notes: string[]) => void
  toggleActive: (refereeId: string) => void
  deleteReferee: (refereeId: string) => void
}

export interface ISearchBarProps {
  search: (searchText: string) => void
}

export interface IShowNotesModalProps {
  isVisible: boolean
  addNote: (id: string) => void
  notes: string[],
  refereeId: string
}

export interface IShowNotesModalState {
  isVisible: boolean
}
