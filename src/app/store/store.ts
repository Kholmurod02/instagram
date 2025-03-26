import { postApi } from '@/entities/post/postApi'
import { configureStore } from '@reduxjs/toolkit'
import { reelsApi } from '../providers/reels'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
