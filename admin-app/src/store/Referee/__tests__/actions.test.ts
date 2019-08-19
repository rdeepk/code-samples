import * as Actions from '../actions'
import { RefereesActionTypeKeys as Keys } from '../types'

describe('RefereesActions', () => {
  it('should create a FetchRefereesSuccess action', () => {
    const expectedAction = {
      referees: {},
      type: Keys.FetchRefereesSuccess
    }
    expect(Actions.fetchRefereesSuccess({})).toEqual(expectedAction)
  })
  it('should create a FetchRefereesFailure action', () => {
    const expectedAction = {
      error: new Error(),
      type: Keys.FetchRefereesFailure
    }
    expect(Actions.fetchRefereesFailure(new Error())).toEqual(expectedAction)
  })
  it('should create a ToggleActive action', () => {
    const expectedAction = {
      id: '1',
      type: Keys.ToggleActive
    }
    expect(Actions.toggleActive('1')).toEqual(expectedAction)
  })
  it('should create a ToggleActiveFailure action', () => {
    const expectedAction = {
      error: new Error(),
      type: Keys.ToggleActiveFailure
    }
    expect(Actions.toggleActiveFailure(new Error())).toEqual(expectedAction)
  })
  it('should create an AddNote action', () => {
    const expectedAction = {
      id: '1',
      text: 'New Note',
      type: Keys.AddNote
    }
    expect(Actions.addNote('1', 'New Note')).toEqual(expectedAction)
  })
  it('should create a AddNoteFailure action', () => {
    const expectedAction = {
      error: new Error(),
      type: Keys.AddNoteFailure
    }
    expect(Actions.addNoteFailure(new Error())).toEqual(expectedAction)
  })
})