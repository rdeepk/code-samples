import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'
import * as Services from '../../../services/Referees'
import { default as reducer } from '../reducers'
import * as Sagas from '../sagas'

// TODO: Finish properly setting up saga tests

describe('Referees Sagas', () => {
  it('should toggle the active state', () => {

    return expectSaga(Sagas.addNote, Services)
      .withReducer(reducer)
      .provide([
        // @ts-ignore
        [call(Services.addNote, 'New Note'), { error: null, isLoading: false, refereeList: {} }]
      ])
      .hasFinalState({ error: null, isLoading: false, refereeList: {} })
      .run()
  })
  // it('should fetch referees', () => {

  //   return expectSaga(Sagas.addNote, Services)
  //     .withReducer(reducer)
  //     .provide([
  //       // @ts-ignore
  //       [call(Services.addNote, 'New Note'), { error: null, isLoading: false, refereeList: {} }]
  //     ])
  //     .hasFinalState({ error: null, isLoading: false, refereeList: {} })
  //     .run()
  // })
  // it('should fail to fetch referees', () => {

  //   return expectSaga(Sagas.addNote, Services)
  //     .withReducer(reducer)
  //     .provide([
  //       // @ts-ignore
  //       [call(Services.addNote, 'New Note'), { error: null, isLoading: false, refereeList: {} }]
  //     ])
  //     .hasFinalState({ error: null, isLoading: false, refereeList: {} })
  //     .run()
  // })
})

