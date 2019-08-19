export interface IResponseAgreementsList {
  getAgreements?: {
    agreementList?: ReadonlyArray<IAgreement>
    statusCode?: number
    msg?: string
  }
  statusCode?: number
  msg?: string
}
export interface IResponseSaveAgreement {
  statusCode?: number
  msg?: string
  agreementId?: number
}
export interface IAgreement {
  ID?: number
  Type: number
  Language: string
  Terms: string
  TypeValue?: string
}