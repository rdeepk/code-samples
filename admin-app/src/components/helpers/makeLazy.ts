import * as Loadable from 'react-loadable'
import Loader from '../Loader'

// tslint:disable-next-line:no-any - FIXME:
const makeLazy = (target: () => Promise<any>) => {
  // @ts-ignore - FIXME: this might help: https://joshblog.net/2018/react-loadable-and-typescript-error-property-render-is-missing-in-type-loader-promise/
  return Loadable({
    loader: target,
    loading: Loader
  })
}

export default makeLazy