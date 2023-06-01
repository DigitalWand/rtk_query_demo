import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { postsApi } from "./api";
import postsReducer from "./posts.slice";

export const store = configureStore({
  reducer: {
    // редьюсер нужный для работы с запросами
    [postsApi.reducerPath]: postsApi.reducer,
    // для управления состоянием приложения
    posts: postsReducer,
  },

  // Мидлвар, который нужен для таких вещей как: кэширование,
  // инвалидация, полинг и др

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

// Утилита, используемая для включения поведения refetchOnMount и refetchOnReconnect.
setupListeners(store.dispatch);
