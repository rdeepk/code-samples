import moment from 'moment-timezone'
import { IPromoCode } from './types'

const PromoCodeQueries = {
  getPromoCodes: (searchText: string) => {
    return `query{
      getPromoCodes(pagination:{
        pageSize: null
        currentPage: null
      }){
        statusCode
        msg
        promoCode {
          id
          usageType
          points
          code
          createDate
          expiryDate
        }
      }
    }`
  },

  getPromoCode: (id: number) => {
    return `query{
      getPromoCode(${id}) {
      promoCode {
        id
        usageType
        points
        code
        createDate
        expiryDate
      }
      msg
      statusCode
  }
    }`
  },

  savePromoCode: (promoCode: IPromoCode) => {
    const userTimeZone = moment.tz.guess()
    return `mutation{
      savePromoCode(promoCode: {
        ${promoCode.id ? `id:${promoCode.id}` : ''}
        code: "${promoCode.code}"
        usageType: ${promoCode.usageType}
        points: ${promoCode.points}
        expiryDate: "${promoCode.expiryDate}"
        timeZone: ${userTimeZone ? `"${userTimeZone}"` : null}
      }){
        statusCode
        msg
        promoCode {
          id
        }
      }
    }`
  },

  deletePromoCode: (id: number) => {
    return `mutation{
      deletePromoCode(promoCodeId:${id}) {
        msg
        statusCode
      }
    }`
  }
}

export default PromoCodeQueries
