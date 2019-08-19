export interface IResponseRefereesList {
  getReferees?: object
  statusCode?: number
  message?: string
  success?: boolean
}

export interface IAddNoteProps {
  id: string,
  text: string
}

export interface IResponseSuspendReferee {
  getReferees?: object
  statusCode?: number
  message?: string
}
