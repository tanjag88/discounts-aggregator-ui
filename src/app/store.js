import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/userSlice";
import filtersReducer from "../features/filtersSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,

  filtersReducer
);

export const store = configureStore({
  reducer: { user: userReducer, filters: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
