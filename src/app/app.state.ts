/**
 * The application state
 */
export class AppState {
  title: string[]
}

/**
 * The default application state
 */
export const defaultAppState: AppState = {
  title: ['rocketcom-angular-developer-take-home-challenge']
}

// Selectors
export const pageTitleSelector = (state: any) => state.app.title
