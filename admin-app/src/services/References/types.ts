export interface IResponseReferencesList {
  getReferencesAdmin?: {
    references: ReadonlyArray<IReference>
    statusCode: string
    msg: string
    pagination: object
  }
  statusCode?: number
  msg?: string
}

export interface IReference {
  referenceId: number
  referenceName: string
  refereeName: string
  referenceDate: string,
  state: string,
}

export interface IResponseDeactivateReference {
  deactivateReference?: {
    statusCode: string
    msg: string
  }
  statusCode?: number
  msg?: string
}

export interface IResponseReactivateReference {
  reactivateReference?: {
    statusCode: string
    msg: string
  }
  statusCode?: number
  msg?: string
}
