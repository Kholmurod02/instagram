import { chatApi } from '@/entities/chats/chat-api'
import { postApi } from '@/entities/post/postApi'
import { reelsApi } from '@/entities/reels/reels'
import { configureStore } from '@reduxjs/toolkit'
import { ProfileApi } from './profileSlice/profileSlice'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [reelsApi.reducerPath]: reelsApi.reducer,
<<<<<<< HEAD
    [chatApi.reducerPath]: chatApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware, chatApi.middleware),
=======
    [ProfileApi.reducerPath] : ProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postApi.middleware, reelsApi.middleware, ProfileApi.middleware),
>>>>>>> e3beddc98a34fcc5d38bb9cfa49a41140172d6be
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
