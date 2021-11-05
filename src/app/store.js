import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import filtersReducer from "../features/filtersSlice";

export const store = configureStore({
  reducer:{user:userReducer, filters: filtersReducer}
});

