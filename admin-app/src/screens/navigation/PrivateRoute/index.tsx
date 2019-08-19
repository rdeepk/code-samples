import Paths from '@screens/navigation/Paths'
import Auth from '@services/Auth'
import * as React from 'react'
import {
  Redirect,
  Route
} from 'react-router-dom'

// @ts-ignore - FIXME: How to handle type of Component
const PrivateRoute = ({ component: Component, ...rest }) => (
  // tslint:disable-next-line:jsx-no-lambda
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated
      ? <Component {...props} />
      : <Redirect to={Paths.Public.Login} />
  )} />
)

export default PrivateRoute