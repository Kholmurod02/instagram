import { postApi } from '@/entities/post/postApi'
import { reelsApi } from '@/entities/reels/reels'
import { configureStore } from '@reduxjs/toolkit'
import { ProfileApi } from './profileSlice/profileSlice'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer, 
    [reelsApi.reducerPath]: reelsApi.reducer,
    [ProfileApi.reducerPath] : ProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware, ProfileApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
