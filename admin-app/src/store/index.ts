import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { agreementsReducer, agreementsSaga } from './Agreements'
import { dashboardReducer } from './Dashboard'
import { referencesReducer, referencesSaga } from './References'
import { refereesReducer, refereesSaga } from './Referees'
import { promoCodesReducer, promoCodesSaga } from './PromoCodes'
import { ticketRevenueReducer, ticketRevenueSaga } from './TicketRevenue'
import { IAppState } from './types'
import { userReducer, userSaga } from './User'

const reducers: Reducer<IAppState> = combineReducers({
  agreements: agreementsReducer,
  dashboard: dashboardReducer,
  references: referencesReducer,
  referees: refereesReducer,
  promoCodes: promoCodesReducer,
  router: routerReducer,
  user: userReducer
})

function* rootSaga() {
  yield all([
    agreementsSaga(),
    referencesSaga(),
    userSaga(),
    refereesSaga(),
    promoCodesSaga(),
  ])
}

const history = createBrowserHistory()
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(logger, router, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
export { history }
