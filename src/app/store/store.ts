import { postApi } from '@/entities/post/postApi'
import { reelsApi } from '@/entities/reels/reels'
import { configureStore } from '@reduxjs/toolkit'
import { ProfileApi } from './profileSlice/profileSlice'
import { historyApi } from '@/entities/story-homepage/story-homepage'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer, 
    [reelsApi.reducerPath]: reelsApi.reducer,
    [ProfileApi.reducerPath] : ProfileApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware, ProfileApi.middleware, historyApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
