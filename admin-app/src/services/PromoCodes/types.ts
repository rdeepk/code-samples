export interface IResponsePromoCodesList {
  getPromoCodes?: object
  savePromoCode?: {
    statusCode: string
    msg: string
  }
  statusCode?: number
  message?: string
  success?: boolean
}

export interface IPromoCode {
  id?: number
  code: string
  usageType: number
  expiryDate: string
  points: number | null
}