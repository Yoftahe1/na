import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './services/user';
import { courseApi } from './services/course';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware,courseApi.middleware),
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
