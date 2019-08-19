import { IReferee } from '@store/Referees/types'

export interface IRefereesProps {
  referees: ReadonlyArray<IReferee>
  getReferees: () => ReadonlyArray<IReferee>
  // filterReferees: (searchText: string) => ReadonlyArray<IReferee>
  fetchReferees: (searchText: string) => void
  addNote: (id: string, note: string) => void
  toggleActive: (id: string) => void
  deleteReferee: (id: string) => void
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
  logout: () => void
}

export interface IRefereesState {
  referees: ReadonlyArray<IReferee>,
  addNoteModal: {
    isVisible: boolean,
    refereeId: string
  }
  showNotesModal: {
    isVisible: boolean,
    refereeId: string,
    notes: string[]
  }
}
