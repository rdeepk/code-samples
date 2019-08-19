import requestGraphql from '../utils/request'
import ReferenceQueries from './queries'
import { IResponseDeactivateReference, IResponseReferencesList, IResponseReactivateReference } from './types'

export const fetchReferences = async (data: object) => {
  const Response: IResponseReferencesList = await requestGraphql({
    query: ReferenceQueries.getReferences(data)
  })
  if(Response.getReferencesAdmin && Response.getReferencesAdmin.statusCode === 'E000') {
    const { references, pagination } = Response.getReferencesAdmin
    return ({
      references,
      pagination,
    })
  }
  return ({
    error: Response.getReferencesAdmin && Response.getReferencesAdmin.msg
  })
}

export const deactivateReference = async (referenceId: number) => {
  const Response: IResponseDeactivateReference = await requestGraphql({
    query: ReferenceQueries.deactivateReference(referenceId)
  })

  if(Response.deactivateReference && Response.deactivateReference.statusCode === 'E000') {
    return ({ sucess: true })
  }
  return ({
    error: Response.deactivateReference && Response.deactivateReference.msg
  })
}

export const reactivateReference = async (referenceId: number) => {
  const Response: IResponseReactivateReference = await requestGraphql({
    query: ReferenceQueries.reactivateReference(referenceId)
  })

  if(Response.reactivateReference && Response.reactivateReference.statusCode === 'E000') {
    return ({ sucess: true })
  }
  return ({
    error: Response.reactivateReference && Response.reactivateReference.msg
  })
}
