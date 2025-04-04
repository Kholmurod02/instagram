import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { chatApi } from "@/entities/chats/chat-api";
import { postApi } from "@/entities/post/postApi";
import { reelsApi } from "@/entities/reels/reels";
import { ProfileApi } from "./profileSlice/profileSlice";
import { historyApi } from "@/entities/story-homepage/story-homepage";
import { usersHomepageApi } from "@/entities/users-homepage/users-homepage";
import { postsHomepageApi } from "@/entities/posts-homepage/post-homepage";
import { searchApi } from "@/entities/search/search";
import { followingApi } from "@/entities/following/follow";
import { authApi } from '@/entities/account/api/authApi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authReducer = (state = { user: null }, action: any) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [reelsApi.reducerPath]: reelsApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [usersHomepageApi.reducerPath]: usersHomepageApi.reducer,
  [postsHomepageApi.reducerPath]: postsHomepageApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [followingApi.reducerPath]: followingApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      postApi.middleware,
      reelsApi.middleware,
      chatApi.middleware,
      ProfileApi.middleware,
      historyApi.middleware,
      usersHomepageApi.middleware,
      postsHomepageApi.middleware,
      searchApi.middleware,
      followingApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
