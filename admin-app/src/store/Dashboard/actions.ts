import { DashboardActionTypeKeys, IChangeTabAction } from './types'

export default {
  changeTab: (tab: number) : IChangeTabAction => ({
    tab,
    type: DashboardActionTypeKeys.ChangeTab
  })
}