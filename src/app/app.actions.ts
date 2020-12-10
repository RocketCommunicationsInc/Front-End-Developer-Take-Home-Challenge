import { createAction, props } from '@ngrx/store'

export const setTitle = createAction(
  '[App] Set Title',
  props<{ title: string[] }>()
)
