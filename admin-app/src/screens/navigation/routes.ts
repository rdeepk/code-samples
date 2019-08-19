import { makeLazy } from '@components/helpers'
import Paths from './Paths'

export default [
  {
    component: makeLazy(() => import('@screens/Login')),
    path: Paths.Public.Login,
  },
  {
    component: makeLazy(() => import('@screens/Dashboard')),
    path: Paths.Dashboard
  }
]