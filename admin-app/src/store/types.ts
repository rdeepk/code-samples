import { Dispatch } from 'react-redux'
import { RouterState as IRouterState } from 'react-router-redux'
import { IAgreementsState } from './Agreements/types'
import { IDashboardState } from './Dashboard/types'
import { IReferencesState } from './References/types'
import { IRefereesState } from './Referees/types'
import { IPromoCodesState } from './PromoCodes/types'
import { IUserState } from './User/types'

export interface IAppState {
  agreements: IAgreementsState
  dashboard: IDashboardState
  references: IReferencesState
  referees: IRefereesState
  promoCodes: IPromoCodesState
  router: IRouterState
  user: IUserState
}

// FIXME: Not currently being used. Taken from blog post, not sure if it's needed
// Additional props for connected React components. This prop is passed by default with `connect()`
export interface IConnectedReduxProps<S> {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<S>
}
