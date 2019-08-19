import { skipRoles } from 'config'
import logger from '../logger'
import { tokenToId, queries } from '../../utils'

const { db } = require('../dbAdapter.js')

let utils = {
  roles: {
    admin: 'ROLE_ADMIN',
    sAdmin: 'ROLE_SUPER_ADMIN',
    csr: 'ROLE_CSR',
    candidate: 'ROLE_CANDIDATE',
    referee: 'ROLE_REFEREE',
  },

  actions: {
    view: 'VIEW',
    modify: 'MODIFY',
    create: 'CREATE',
    login: 'LOGIN',
    change: 'CHANGE',
    suspend: 'SUSPEND',
  },

  objects: {
    adminReference: 'ADMIN_REFERENCE',
    adminAgreements: 'AGREEMENTS_ADMIN',
    refereeReferences: 'REFERENCELIST_REFEREE',
    adminApp: 'ADMIN',
    reference: 'REFERENECE',
    referenceDashboard: 'REFERENEC_DASHBOARD',
    referenceCandidate: 'REFERENCE_CANDIDATE',
    invitationRecruiter: 'INVITATION_RECRUITER',
    user: 'USER',
    userPassword: 'USER_PASSWORD',
    refereeDashboard: 'REFEREE_DASHBOARD',
    refreeReferenceList: 'REFEREE_REFERENCELIST',
    refereeList: 'REFEREE_LIST',
    refree: 'REFEREE'
  },

  getPermissions: (objOperations) => {
    const permissionArray = []
    for (const key in objOperations) {
      if ({}.hasOwnProperty.call(objOperations, key)) {
        permissionArray.push(`${utils.getObject(key)}_${objOperations[key]}`)
      }
    }
    return permissionArray
  },

  getObject: (key) => {
    return utils.objects[key]
  },

  /**
   * Checks if the logged in user is the owner of the refree
   * @param {string} refree - The id of the refree coming with graphql request.
   * @param {object} obj - user object with active refree id of the logged in user.
   * @returns {boolean} - Returns true if refree belongs to logged in user.
   */
  isRefereeOwner: async (refree, { refreeID }) => {
    return parseInt(refree, 10) === refreeID
  },

  /**
   * Checks if the logged in user is the owner of the refrence
   * @param {string} refrenceID - The id or token of the reference coming with graphql request.
   * @param {object} obj - User object with user's array of refrence ids for the logged in user.
   * @returns {boolean} - Returns true if logged in user is the owner of reference.
   */
  isReferenceOwner: async (referenceID, { References }) => {
    return References.indexOf(tokenToId(referenceID, false)) !== -1
  },

  /**
   * Checks if the provided id belongs to logged in user.
   * @param {integer} ID - The id of the user that needs to be verified.
   * @param {integer} UserID - Id of the logged in user.
   * @returns {boolean} - Returns true if provided id is of logged in user.
   */
  isOwner: async (ID, UserID) => {
    return ID === UserID
  },

  /**
   * Checks if the user is in the list of roles exempted from the check.
   * @param {Array} userRoles - The array of user roles.
   * @param {Array} exemptRoles - Array of roles exempted from the checks.
   * @returns {boolean} - Returns true if user is exempted from the checks.
   */
  isExempt: (userRoles, exemptRoles) => {
    if (exemptRoles && skipRoles) {
      return userRoles.some((role) => {
        return exemptRoles.includes(role)
      })
    }
    return false
  },

  /**
   * Checks if the user is reciever of a reference.
   * @param {number} referenceID - The id or token of the reference to check.
   * @param {integer} UserID - The user id for which to verify if it is the reciever.
   * @returns {boolean} - Returns true if user is reciever of the reference.
   */
  isReferenceReciever: async (referenceID, { UserID }) => {
    try {
      const role = await db.one(queries.getUserRoleForReference(referenceID, UserID))
      return parseInt(role.count, 10) !== 0
    } catch (e) {
      logger.ERROR('isReferenceReciever -', e)
      return null
    }
  },

  /**
   * Checks if the user is referee of a reference.
   * @param {number} referenceID - The id or token of the reference to check.
   * @param {integer} UserID - The user id for which to verify if it is the referee.
   * @returns {boolean} - Returns true if user is referee of the reference.
   */
  isReferenceReferee: async (referenceID, { UserID }) => {
    try {
      const role = await db.one(queries.getUserRoleForReference(referenceID, UserID))
      return parseInt(role.count, 10) !== 0
    } catch (e) {
      logger.ERROR('isReferenceReferee -', e)
      return null
    }
  },

 /**
   * Checks if the user is owner of the invitation.
   * @param {number} InviteID - The id or token of the invitation to check.
   * @param {integer} UserID - The user id for which to verify if it is the owner.
   * @returns {boolean} - Returns true if user is owner of the invitation.
   */
  isinviteOwner: async (InviteID, { UserID }) => {
    try {
      const role = await db.one(queries.getUserRoleForInvitation(InviteID, UserID))
      return parseInt(role.count, 10) !== 0
    } catch (e) {
      logger.ERROR('isinviteOwner -', e)
      return null
    }
  },

  /**
   * Checks if the provided user is refree/owner of the reference.
   * @param {string} referenceID - The id or token of the reference to check.
   * @param {object} user - Object with id of the user and list if user reference ids.
   * @returns {boolean} - Returns true if user is owner/refree.
   */
  verifyReferenceReferee: async (referenceID, user) => {
    const { References } = user
    const isReferee = await utils.isReferenceReferee(tokenToId(referenceID, false), user)
    return !isReferee ? utils.isReferenceOwner(referenceID, { References }) : true
  },

  /**
   * Checks if the invitation of referee belongs to the user.
   * @param {integer} InviteID - The id of the invite to check.
   * @param {object} user - Object with id of the user and list if user invite ids.
   * @returns {boolean} - Returns true if invite belongs to the user.
   */
  verifyInviteCandidate: async (InviteID, user) => {
    return utils.isinviteOwner(InviteID, user)
  },
}

module.exports = utils
