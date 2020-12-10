import { ActionReducer, createReducer, on } from '@ngrx/store'
import { setTitle } from '@grm/app.actions'
import { AppState, defaultAppState } from '@grm/app.state'

export const appReducers: ActionReducer<AppState> = createReducer(
  defaultAppState,
  on(setTitle, (state: AppState, { title }) => ({
    ...state,
    title
  }))
)
