import { postApi } from '@/entities/post/postApi'
import { reelsApi } from '@/entities/reels/reels'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer, 
    [reelsApi.reducerPath]: reelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
