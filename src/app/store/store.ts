import { chatApi } from '@/entities/chats/chat-api'
import { postApi } from '@/entities/post/postApi'
import { reelsApi } from '@/entities/reels/reels'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [reelsApi.reducerPath]: reelsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware, chatApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
