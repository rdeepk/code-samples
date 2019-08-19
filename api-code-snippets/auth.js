import passport from 'passport'
import { Strategy } from 'passport-local'
import logger from './logger'
import { db } from './dbAdapter'
import Redis from './redis'
import { queries } from '../../utils'

const resetSessionUsers = {}

const userBaseData = async (userID) => {
  try {
    const references = []
    const referee = await db.one(queries.getRefree(userID))
    const rawRefernces = await db.any(queries.getReferences(userID))
    rawRefernces && rawRefernces.forEach((reference) => {
        references.push(reference.ID)
    })
    return ({ references, refereeID: referee.ID })
  } catch (e) {
    logger.ERROR('userBaseData -', e)
  }
}

const updateUserPermissions = async (req) => {
  // a solution to update permissions for logged in user after adding/deleting permissions in DB
  try {
    const res = await db.one(queries.getRoleAndPermissions(req.user.UserID))
    req.login({
      p_id: req.user.UserID,
      p_roles: res.Roles,
      permissions: res.Permissions,
      p_confirmed: req.user.EmailConfirmed,
      references: req.user.References,
      refereeID: req.user.refereeID,
    }, function(err) {
      if (err) {
        logger.ERROR('updateUserPermissions:', err)
      } else if (resetSessionUsers.IDs && resetSessionUsers.IDs.some(id => id === res.UserID)) {
        const newValue = resetSessionUsers.IDs.filter(id => id !== res.UserID)
        resetSessionUsers.IDs = newValue
        db.any(`delete from ec."ResetSessionUsers" where "ID" = ${res.UserID}`)
      }
      return true
    })
  } catch (err) {
    logger.ERROR('updateUserPermissions:', err)
  }
}

// PassportJS setting

passport.use('default', new Strategy({ usernameField: 'email' }, (email, password, done) => {
  db.func('ec."UserSignin"', [email, password])
    .then((res) => {
      if (res[0].p_id > 0) {
        res[0].permissions = []
        db.func('ec."UserGetPermissions"', [res[0].p_id])
          .then((permissions) => {
            permissions.forEach((permission) => {
              res[0].permissions.push(permission.PermissionCode)
            })
            userBaseData(res[0].p_id)
              .then((data) => {
                res[0].references = data.references
                res[0].refereeID = data.refereeID
                return done(null, res)
              })
          })
      } else {
        return done(null, res)
      }
    })
    .catch((err) => {
      return done(err)
    })
}))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(res, done) {
  done(null, {
    UserID: res.p_id,
    Roles: res.p_roles,
    Permissions: res.permissions,
    EmailConfirmed: res.p_confirmed,
    References: res.references,
    RefereeID: res.refereeID
  });
});

passport.deserializeUser(function(user, done) {
  //TODO check for token/session id and validate user info
  if(!user) return done(false)
  return done(null,user)
});

const verifyAdminRole = (roles) => {
  return new Promise((resolve, reject) => {
    if (roles.indexOf('ROLE_ADMIN') || roles.indexOf('ROLE_SUPER_ADMIN')) {
      resolve(true)
    } else {
      reject()
    }
  })
}

const isEmailConfirmed = (confirmed) => {
  return confirmed
}

const Auth = {

  login: (email, password, isAdmin, res, req) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('default', (err, response) => {
        if (!response) {
          reject({
            statusCode: 'E010',
            msg: 'System Error Occured! Authorziation failed.'
          })
        } else {
          if (response[0].p_code != "E000"){
            resolve(response)
          } else if (!isEmailConfirmed(response[0].p_confirmed)) {
            return res.status(240).json({
              statusCode: '240',
              msg: 'Email not confirmed',
            })
          } else {
            req.login(response[0], () => {
              resolve(response)
            })
          }
        }
      })({ body: { email, password } })
    })
  },

  verify: (req, res, next) => {
    // verify user info
    if (req.isAuthenticated()) {
      Redis.getKey(req.sessionID)
        .then(redisRes => JSON.parse(redisRes))
        .then(redisRes => {
          const passportUser = (redisRes && redisRes.passport) ? redisRes.passport.user : undefined
          const { user } = req
          if (user && passportUser && user.UserID === passportUser.UserID) {
            if (!user.EmailConfirmed) {
              req.logout()
              return res.status(240).json({
                statusCode: '240',
                msg: 'Email not confirmed',
              })
            }
            if (resetSessionUsers.IDs && resetSessionUsers.IDs.some(id => id === user.UserID)) {
              updateUserPermissions(req)
            }
            return next()
          } else {
            req.logout()
            return res.status(403).json({msg: 'Not logged in'})
          }
        })
        .catch((err) => {
          logger.ERROR('auth.js verify Redis getKey error:', err)
        })
    } else {
      req.logout()
      return res.status(403).json({ msg: 'Not logged in' })
    }
  },

  verifyAdmin: (req, res, next) => {
    // verify user info
    if (req.isAuthenticated()) {
      Redis.getKey(req.sessionID)
        .then(redisRes => JSON.parse(redisRes))
        .then(redisRes => {
          const passportUser = (redisRes && redisRes.passport) ? redisRes.passport.user : undefined
          const { user } = req
          if (user && passportUser && user.UserID === passportUser.UserID) {
            if (!user.EmailConfirmed) {
              req.logout()
              return res.status(240).json({
                statusCode: '240',
                msg: 'Email not confirmed',
              })
            }

            verifyAdminRole(user.Roles)
              .then((verified) => {
                if (verified) {
                  return next()
                }
                req.logout()
                return res.status(403).json({ msg: 'User does not have permission' })
              })
              .catch(() => {
                req.logout()
                return res.status(403).json({ msg: 'User does not have permission' })
              })
          } else {
            req.logout()
            return res.status(403).json({ msg: 'Not logged in' })
          }
        })
        .catch((err) => {
          logger.ERROR('auth.js verify Redis getKey error:', err)
        })
    } else {
      req.logout()
      return res.status(403).json({ msg: 'Not logged in' })
    }
  },

  updateReferencesInUser: (references, req) => {
    req.login({
      p_id: req.user.UserID,
      p_roles: req.user.Roles,
      permissions: req.user.Permissions,
      p_confirmed: req.user.EmailConfirmed,
      references,
      refereeID: req.user.refereeID,
    }, function(err) {
      if (err) {
        logger.ERROR('updateReferencesInUser:', err)
      }
      return true
    })
  },

  updateResetSessionUsers: async () => {
    const userList = await db.one(queries.getResetSessionUsers)
    resetSessionUsers.IDs = userList.IDs
  },

}

export default Auth
