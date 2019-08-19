import requestGraphql from '../utils/request'
import RefereeQueries from './queries'
import { IAddNoteProps,
  IResponseRefereesList,
  IResponseSuspendReferee
 } from './types'

export const fetchReferees = async (searchText: string) => {
  const Response: IResponseRefereesList = await requestGraphql({
    query: RefereeQueries.getReferees(searchText)
  })
  return Response.getReferees
}

export const addNote = async (props: IAddNoteProps) => {
  // const { id, text} = props
  const result = await requestGraphql({ query: '' })
  return result
}

export const toggleActive = async (id: string) => {
  const result = await requestGraphql({ query: '' })
  return result
}

export const suspendReferee = async (refereeId: number) => {
  const Response: IResponseSuspendReferee = await requestGraphql({
    query: RefereeQueries.suspendReferee(refereeId)
  })
  return Response
}

export const unsuspendReferee = async (refereeId: number) => {
  const Response: IResponseSuspendReferee = await requestGraphql({
    query: RefereeQueries.unsuspendReferee(refereeId)
  })
  return Response
}
