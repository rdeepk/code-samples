import * as Actions from '../actions'
import { default as reducer } from '../reducers'
// tslint:disable-next-line:no-duplicate-imports
import * as Selectors from '../reducers'
import { RefereesActionType as ActionType } from '../types'

const refereeId = '1'
const lastActiveDate = new Date()

const initialState = {
  error: null,
  isLoading: false,
  refereeList: {
    [refereeId]: {
      Email: 'info@vpl.ca',
      TotalReferences: 12,
      RefereeID: refereeId,
      RefereeName: 'Vancouver Public Library',
      active: true,
      lastActive: lastActiveDate,
    }
  }
}

describe('RefereesReducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as ActionType)).toEqual({
      error: null,
      isLoading: false,
      refereeList: {}
    })
  })

  it('should toggle the active state (EP-531)', () => {
    const expectedState = {
      ...initialState,
      refereeList: {
        [refereeId]: {
          Email: 'info@vpl.ca',
          TotalReferences: 12,
          RefereeID: refereeId,
          RefereeName: 'Vancouver Public Library',
          active: false,
          lastActive: lastActiveDate,
        }
      }
    }
    expect(reducer(initialState, Actions.toggleActive(refereeId))).toEqual(expectedState)
  })
  it('should be loading', () => {
    expect(reducer(initialState, Actions.fetchRefereesPending())).toEqual({
      ...initialState,
      isLoading: true
    })
  })
  it('should be loaded', () => {
    expect(reducer(undefined, Actions.fetchRefereesSuccess(initialState.refereeList))).toEqual(initialState)
  })
  it('should set an error', () => {
    expect(reducer(initialState, Actions.fetchRefereesFailure(new Error()))).toEqual({
      ...initialState,
      error: new Error(),
      isLoading: false
    })
  })
  it('should get all the referees', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: { ...initialState },
      router: {}
    }
    const expectedArray = Object.keys(initialState.refereeList).map(index => initialState.refereeList[index])
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.getReferees(appState)).toEqual(expectedArray)
  })
  it('should filter the referees by name', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: {
        ...initialState,
        refereeList: {
          1: {
            active: true,
            email: 'info@vpl.ca',
            id: 1,
            lastActive: lastActiveDate,
            name: 'Vancouver Public Library',
            totalReferences: 12,
          },
          2: {
            active: false,
            email: 'contact@vantheatre.com',
            id: '2',
            lastActive: new Date(),
            name: 'Vancouver Theatre',
            totalReferences: 1,
          }
        }
      },
      router: {}
    }
    const expectedArray = [
      {
        active: true,
        email: 'info@vpl.ca',
        id: 1,
        lastActive: lastActiveDate,
        name: 'Vancouver Public Library',
        totalReferences: 12,
      }
    ]
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.filterReferees(appState, 'vpl')).toEqual(expectedArray)
  })
  it('should filter the referees by email (EP-531)', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: {
        ...initialState,
        refereeList: {
          1: {
            active: true,
            email: 'info@vpl.ca',
            id: 1,
            lastActive: lastActiveDate,
            name: 'Vancouver Public Library',
            totalReferences: 12,
          },
          2: {
            active: false,
            email: 'contact@vantheatre.com',
            id: '2',
            lastActive: new Date(),
            name: 'Vancouver Theatre',
            totalReferences: 1,
          }
        }
      },
      router: {}
    }
    const expectedArray = [
      {
        active: false,
        email: 'contact@vantheatre.com',
        id: '2',
        lastActive: new Date(),
        name: 'Vancouver Theatre',
        totalReferences: 1,
      }
    ]
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.filterReferees(appState, 'Theatre')).toEqual(expectedArray)
  })
  it('should return [] when no referees', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: {
        ...initialState,
        refereeList: {
          1: {
            active: true,
            email: 'info@vpl.ca',
            id: 1,
            lastActive: lastActiveDate,
            name: 'Vancouver Public Library',
            totalReferences: 12,
          }
        }
      },
      router: {}
    }
    // @ts-ignore: don't care about array type
    const expectedArray = []
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.filterReferees(appState, 'abc')).toEqual(expectedArray)
  })
  it('should return [] when no filter matches', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: {
        ...initialState,
        refereeList: null
      },
      router: {}
    }
    // @ts-ignore: don't care about array type
    const expectedArray = []
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.filterReferees(appState, 'Theatre')).toEqual(expectedArray)
  })
  it('should return all referees when search text empty', () => {
    const appState = {
      dashboard: {
        selectedTab: 1
      },
      referees: {
        ...initialState,
        refereeList: {
          1: {
            active: true,
            email: 'info@vpl.ca',
            id: 1,
            lastActive: lastActiveDate,
            name: 'Vancouver Public Library',
            totalReferences: 12,
          }
        }
      },
      router: {}
    }
    // @ts-ignore: don't care about array type
    const expectedArray = [{
      active: true,
      email: 'info@vpl.ca',
      id: 1,
      lastActive: lastActiveDate,
      name: 'Vancouver Public Library',
      totalReferences: 12,
    }]
    // @ts-ignore: appState doesn't have a proper router, but doesn't matter
    expect(Selectors.filterReferees(appState, '')).toEqual(expectedArray)
  })
})