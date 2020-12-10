import { createAction, props } from '@ngrx/store'

/**
 * The page title action
 */
export const setTitle = createAction(
  '[App] Set Title',
  props<{ title: string[] }>()
)
