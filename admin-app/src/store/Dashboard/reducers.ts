import { IAppState } from '@store/types'
import { DashboardActionTypeKeys, DashboardActionTypes, IDashboardState } from './types'

const initialState: IDashboardState = {
  selectedTab: 1
}

const dashboardReducer = (state: IDashboardState = initialState, action: DashboardActionTypes): IDashboardState => {
  switch(action.type) {
    case DashboardActionTypeKeys.ChangeTab:
      return { ...state, selectedTab: action.tab }
    default:
      return state
  }
}

export default dashboardReducer

export const DashboardSelectors = {
  getSelectedTab: (state: IAppState): number => {
    return state.dashboard.selectedTab
  }
}