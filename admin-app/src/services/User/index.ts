import CookieHelper from '../utils/CookieHelper'
import requestGraphql from '../utils/request'
import UserQueries from './queries'
import {  IResponseLogin,
          IResponseUser,
          ISetCookieResponse } from './types'

const { clearAppCookieStore, setDataInCookieStore } = CookieHelper

const query = `mutation{
  logout {
    statusCode
    msg
  }
}`

export const login = async (username: string, password: string) => {
  const Response: IResponseLogin = await requestGraphql({
    isOpenApi: true,
    query: UserQueries.Login(username, password),
  })
  if (Response.statusCode === 200 && Response.adminLogin) {
    if (Response.adminLogin.statusCode === 'E000') {
      // check if the account is confirmed
      if (Response.adminLogin.user && Response.adminLogin.user.EMailConfirmed) {
        setDataInCookieStore({ adminuser: {roles: Response.adminLogin.user.roles} }, {})
        const ResponseUser: IResponseUser = await requestGraphql({
          query: UserQueries.GetUser(),
        })
        if (ResponseUser.adminUser) {
          // @ts-ignore
          ResponseUser.adminUser.user.roles = Response.adminLogin.user.roles
          setDataInCookieStore({ adminuser: ResponseUser.adminUser.user }, {})
            .then((res: ISetCookieResponse) => {
              if (!res.success) {
                return { error: 'Error setting cookie' }
              }
              return (Response.success)
            })
        }
        // @ts-ignore
        if(ResponseUser.adminUser.user) {
          // @ts-ignore
          return ResponseUser.adminUser.user
        }
        return ResponseUser.adminUser
      }
      return { error: 'Email not confirmed' }
    }
    if (Response.adminLogin.statusCode === 'E006' || Response.adminLogin.statusCode === 'E007') {
      return { error: 'Email address or password is incorrect.' }
    } 
    
    if (Response.adminLogin.statusCode === 'E010') {
      return { error: 'System Error Occurred.' }
    }
    if (Response.adminLogin.statusCode === 'E024') {
      return {error: 'Access Denied.'}
    }
    return { error: Response.adminLogin.msg }
  }
  if (Response.statusCode === 240) {
    return {error: 'Your email is not confirmed.'}
  }
  return { error: `A network connection or a security issue detected. CODE:${Response.statusCode}`}
}

export const logout = async () => {
  clearAppCookieStore()
  const Response: IResponseUser = await requestGraphql({
    isOpenApi: true,
    query,
  })
  console.log('user service logout ', Response)
}