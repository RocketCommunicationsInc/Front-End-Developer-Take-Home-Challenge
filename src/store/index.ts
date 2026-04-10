import { configureStore } from '@reduxjs/toolkit';

import { contactApi } from '@services/contact';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contactApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
