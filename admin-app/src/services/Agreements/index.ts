import requestGraphql from '../utils/request'
import AgreementQueries from './queries'
import { IAgreement, IResponseAgreementsList, IResponseSaveAgreement } from './types'

export const fetchAgreements = async () => {
  const Response: IResponseAgreementsList = await requestGraphql({
    query: AgreementQueries.getAgreements()
  })
  if(!Response.getAgreements) return []
  // @ts-ignore FIXME: can agreementList be undefined? If so test.
  return Response.getAgreements.agreementList.map((agreement: IAgreement) => ({
    id: agreement.ID,
    language: agreement.Language,
    terms: agreement.Terms,
    type: agreement.Type,
    typeValue: agreement.TypeValue
  }))
}

export const saveAgreement = async (agreement: IAgreement) => {
  const { Type, Language, Terms } = agreement
  const Response: IResponseSaveAgreement = await requestGraphql({
    query: AgreementQueries.saveAgreement(Type, Language, Terms)
  })
  return Response.agreementId
}

