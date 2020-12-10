import { ActionReducer, createReducer, on } from '@ngrx/store'
import { setTitle } from './app.actions'
import { AppState, defaultAppState } from './app.state'

export const appReducers: ActionReducer<AppState> = createReducer(
  defaultAppState,
  on(setTitle, (state: AppState, { title }) => ({
    ...state,
    title
  }))
)
