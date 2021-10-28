import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {
      userId: uuidv4(),
      viewedProducts: [],
      likedProducts: [],
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addViewedProduct: (state, action) => {
      state.viewedProducts.push(action.payload);
      localStorage.setItem("userData", JSON.stringify(state));
    },
    addLikedProduct: (state, action) => {
      state.likedProducts.push(action.payload);
      localStorage.setItem("userData", JSON.stringify(state));
    },
    removeLikedProducts: (state, action) => {
      state.likedProducts = state.likedProducts.filter(
        (p) => p !== action.payload
      );
    },
  },
});

export const { addViewedProduct, addLikedProduct, removeLikedProducts } =
  userSlice.actions;

export default userSlice.reducer;
