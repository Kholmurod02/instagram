import { configureStore } from '@reduxjs/toolkit'
import { ProfileApi } from './profileSlice/profileSlice'

export const store = configureStore({
  reducer: {
    [ProfileApi.reducerPath] : ProfileApi.reducer
  },
  middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(ProfileApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch