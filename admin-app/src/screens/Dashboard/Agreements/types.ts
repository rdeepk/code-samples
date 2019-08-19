import { IAgreement, IAgreementType } from '@store/Agreements/types'

export interface IAgreementsProps {
  agreements: ReadonlyArray<IAgreementType>
  fetchAgreements: () => void
  saveAgreement: (agreement: IAgreement) => void
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
  logout: () => void
}

export interface IAgreementsState {
  languageList: string[],
  agreementTest: string,
  agreementIndex: number,
  agreementLanguage: string
}
