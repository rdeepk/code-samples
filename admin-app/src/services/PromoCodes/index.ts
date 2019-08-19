import requestGraphql from '../utils/request'
import PromoCodeQueries from './queries'
import { IPromoCode, IResponsePromoCodesList } from './types'

export const fetchPromoCodes = async (searchText: string) => {
  const Response: IResponsePromoCodesList = await requestGraphql({
    query: PromoCodeQueries.getPromoCodes(searchText)
  })
  return Response.getPromoCodes
}

export const savePromoCode = async (promoCode: IPromoCode) => {
  const Response: IResponsePromoCodesList = await requestGraphql({
    query: PromoCodeQueries.savePromoCode(promoCode)
  })
  if(Response.savePromoCode && Response.savePromoCode.statusCode === 'E000') {
    return Response
  }
  return {error: Response.savePromoCode && Response.savePromoCode.msg}
}

export const deletePromoCode = async (promoCodeId: number) => {
  const Response: IResponsePromoCodesList = await requestGraphql({
    query: PromoCodeQueries.deletePromoCode(promoCodeId)
  })
  return Response
}
