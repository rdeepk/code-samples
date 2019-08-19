import AppConfig from '@src/config'
import Cookies from 'js-cookie'

const { appCookieName, domain, secure } = AppConfig.cookieSetting

const CookieHelper = {
  /*************************************************
   * check if session cookie exist (i.e if user is logged in)
   ************************************************** */
  async checkSessionCookie() {
    const sessionCookie = Cookies.get('connect.sid')
    return {
      success: !!sessionCookie
    }
  },

  /*********************************************
   * get the value from app cookie store
   * @param {String} key key string. ex. 'user'
   ********************************************* */
  async getAppCookieValue(key: string) {
    const appCookieStore = Cookies.get(appCookieName)
      // @ts-ignore
      ? JSON.parse(Cookies.get(appCookieName))
      : null
    return {
      retrievedCookie:
        appCookieStore && key ? appCookieStore[key] : appCookieStore,
      success: !!appCookieStore
    }
  },

  /************************************
   * get the whole app cookie store data
   ************************************* */
  async getAppCookieStore() {
    const appCookieStore = Cookies.get(appCookieName)
    return {
      retrievedAppCookieStore: appCookieStore,
      success: !!appCookieStore
    }
  },

  /*********************************************
   * Save data in app cookie store
   * with default domain and path.
   * @param {Object} data data object. ex. {user: { id : idValue }}
   * @param {Object} options options object. ex. { expires: expireDays }
   ********************************************** */
  async setDataInCookieStore(data: object, options: object) {
    // ready any existing cookies for the app.
    const currentAppCookieStore = Cookies.get(appCookieName)
      // @ts-ignore
      ? JSON.parse(Cookies.get(appCookieName))
      : null
    const appCookie = Cookies.set(
      appCookieName,
      {
        ...currentAppCookieStore, // merge the new data with current cookie replacing the values for existing keys
        ...data
      },
      {
        ...options,
        domain: `${domain}`, // cookies only accessible to the given domain.
        expires: 365,
        path: '/',
        secure
      }
    )

    // guarantee synchronized return from the method.
    return {
      appCookieStore: Cookies.get(appCookieName),
      success: !!appCookie
    }
  },

  /***************************************
   * clear session cookie
   ************************************** */
  async clearSessionCookie() {
    const sessionCookie = Cookies.remove('connect.sid', {
      domain: `${domain}`,
      path: '/'
    })
    return {
      success: !sessionCookie
    }
  },

  /*****************************************
   * clear all app cookie
   **************************************** */
  async clearAppCookieStore() {
    const appCookieStore = Cookies.remove(appCookieName, {
      domain: `${domain}`,
      path: '/'
    })
    return {
      success: !appCookieStore
    }
  },

  /******************************************
   * clear all readable cookie
   ****************************************** */
  async clearAllCookie() {
    const cookieStores = Cookies.get()
    const keys = Object.keys(cookieStores)

    keys.map(key => {
      Cookies.remove(key, { domain: `${domain}`, path: '/' })
    })
  }
}

export default CookieHelper
