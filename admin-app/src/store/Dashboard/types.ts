import { Action } from 'redux'

export interface IDashboardState {
  selectedTab: number
}

export enum DashboardActionTypeKeys {
  ChangeTab = '@@dashboard/CHANGE_TAB'
}

export interface IChangeTabAction extends Action {
  type: DashboardActionTypeKeys.ChangeTab,
  tab: number
}

export type DashboardActionTypes =
  IChangeTabAction