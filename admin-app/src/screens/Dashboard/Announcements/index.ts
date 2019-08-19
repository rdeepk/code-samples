import Loader from '@components/Loader'
import * as Loadable from 'react-loadable'

// @ts-ignore - FIXME:
export default Loadable({
  loader: () => import('./Announcements'),
  loading: Loader
})