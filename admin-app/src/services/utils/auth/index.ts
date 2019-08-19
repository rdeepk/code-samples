import Paths from '@screens/navigation/Paths'
import CookieHelper from '../CookieHelper'
import { ICookieResponse, ILoginCheckResponse } from './types'

const { checkSessionCookie, clearAppCookieStore, getAppCookieValue } = CookieHelper

export async function loginSanityCheck(isOpenApi?: boolean) {
  try {
    if (isOpenApi || await isAdmin()) {
      const sessionCookieRes = await checkSessionCookie()
      if (sessionCookieRes.success || isOpenApi) {
        const response: ILoginCheckResponse = { success: true }
        return response
      }
      redirectLogin()
      const resp: ILoginCheckResponse = { success: false }
      return resp
    }
      redirectLogin()
      const resps: ILoginCheckResponse = { success: false }
      return resps
  } catch (sessionCookieErr) {
    console.log("error occurred in checking session cookie:", sessionCookieErr)
    return {
      error: sessionCookieErr
    }
  }
}

async function isAdmin() {
  const user = await getAppCookieValue('adminuser')
    if (user.retrievedCookie && user.retrievedCookie.roles) {
      return user.retrievedCookie.roles.includes('ROLE__SUPER_ADMIN') || user.retrievedCookie.roles.includes('ROLE__ADMIN')
    }
    return false
}

/**
 * clear session cookie and redirect to login page
 */
export function redirectLogin() {
  clearAppCookieStore()
    .then((res: ICookieResponse) => {
      if (res.success) {
        document.location.href = Paths.Public.Login
      }
    })
    .catch(err => {
      console.log("error occurred when clearing session cookie: ", err)
    })
}
