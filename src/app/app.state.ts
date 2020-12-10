export class AppState {
  title: string[]
}

export const defaultAppState: AppState = {
  title: ['rocketcom-angular-developer-take-home-challenge']
}

// Selectors
export const pageTitleSelector = (state: any) => state.app.title
