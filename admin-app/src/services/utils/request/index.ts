import AppConfig from '@src/config'
import { GraphQLClient } from 'graphql-request'
import { loginSanityCheck, redirectLogin } from '../auth'
import * as Response from '../ResponseCreator'
import StatusCodes from '../StatusCodes'
import {
  IFetchOptions,
  IFetchResponse,
  ILoginSanityCheck,
  IRequestResponse
} from './types'

const { admin, open } = AppConfig.api

const openApiClient = new GraphQLClient(open, {
  credentials: 'include',
  mode: 'cors'
})

const graphqlApiClient = new GraphQLClient(admin, {
  credentials: 'include',
  mode: 'cors',
})

const fetch = async ({ isOpenApi, query }: IFetchOptions) => {
  const client = isOpenApi ? openApiClient : graphqlApiClient
    try {
      const res = await client.request(query)
      // @ts-ignore
      return Response.Success(Object.values(res)[0].msg, res)
    }      
    catch(error) {
      console.log('Fetch error', error)
      throw new Error(error)
    }
}

export default async function requestGraphql(
  options: IFetchOptions
): Promise<IRequestResponse> {
  const { isOpenApi, url } = options

  if (typeof isOpenApi !== 'boolean') {
    if (url) {
      options.isOpenApi = url === open
    } else {
      options.isOpenApi = false
    }
  }
  let requestResponse = {}
  try {
    const checkRes: ILoginSanityCheck = await loginSanityCheck(isOpenApi)
    if (checkRes.success) {
      try {
        // @ts-ignore
        const response: IFetchResponse = await fetch(options)
        const { statusText, status } = response
        requestResponse = {
          message: statusText,
          statusCode: status,
          success: true,
          ...response.data
        }
      } catch (error) {
        let message
        let statusCode
        const { response } = error
        if (response && response instanceof Object) {
          const { data } = response
          statusCode = response.status ? response.status : response.statusCode
          message = response.msg
          if (statusCode && statusCode === StatusCodes.Forbidden) {
            redirectLogin()
          } else if (!message) {
            message =
              data && data.message ? data.message : 'System error occurred.'
          }
        } else {
          statusCode = StatusCodes.NetworkError
          message = error.message || 'Network Error'
        }
        // if(!message && !statusCode) {
        //   message = 'Logout user'
        // }
        return {
          message,
          statusCode
        }
      }
    }
  } catch (checkErr) {
    console.log('loginSanityCheck checkErr: ', checkErr)
    throw new Error(checkErr)
  }
  return requestResponse
}
