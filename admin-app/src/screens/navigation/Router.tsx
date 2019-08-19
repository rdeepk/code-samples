import { NotFound } from '@src/components'
import { history } from '@src/store'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Paths from './Paths'
import PrivateRoute from './PrivateRoute'
import routes from './routes'

const PublicPaths = Object.keys(Paths.Public)

const Router: React.SFC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      {/* tslint:disable-next-line jsx-no-lambda */}
      <Route exact={true} path={Paths.Public.Home} render={() => <Redirect to={Paths.Public.Login} />} />
      {
        routes.map((route) => (
          PublicPaths.indexOf(route.path) >= 0
            ? <Route key={route.path} path={route.path} component={route.component} />
            : <PrivateRoute key={route.path} path={route.path} component={route.component} />
        ))
      }
      <Route path="*" component={NotFound} />
    </Switch>
  </ConnectedRouter>
)

export default Router

