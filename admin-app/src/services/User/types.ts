export interface IResponseLogin {
  adminLogin?: {
    statusCode: string
    msg: string
    roles: string[]
    user: {
      UserID?: number
      EMailConfirmed?: boolean
      ReferencesCount?: number
      roles: string[]
    }
  }
  statusCode?: number
  message?: string
  success?: boolean
}

export interface IResponseUser {
  adminUser?: {
    user: {
      roles: string[]
    }
  }
  statusCode?: number
  message?: string
  success?: boolean
}

export interface ISetCookieResponse {
  success: boolean
}