export interface IFetchOptions {
  isOpenApi?: boolean
  query: string
  url?: string
}

export interface IFetchResponse {
  message?: string
  statusText?: string
  status?: string
  data?: object
}

export interface IRequestResponse {
  data?: object
  statusCode?: number
  message?: string
  success?: boolean
}

export interface ILoginSanityCheck {
  success?: boolean
  error?: object
}