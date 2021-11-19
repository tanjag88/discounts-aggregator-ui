import { createSlice } from "@reduxjs/toolkit";


const defaultState = {
  category: {
    value: [],
    categories: ["furniture", "electronics"],
  },
  seller: {
    value: [],
    sellers: ["Structube", "BestBuy"],
  },
  priceRange: {
    value: [0, 10000],
  },
  sorting: { value: [] },
  limit: { value: 6 },
  currentPage: { value: 1 },
  searchQuery: { value: "" },
};
const initialState = {
  category: {
    value: [],
    categories: ["furniture", "electronics"],
  },
  seller: {
    value: [],
    sellers: ["Structube", "BestBuy"],
  },
  priceRange: {
    value: [0, 10000],
  },
  sorting: { value: ["views.length", "desc"] },
  limit: { value: "" },
  currentPage: { value: "" },
  searchQuery: { value: "" },
  
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetFilters: (state) => defaultState,
    setCategoryResetFilters: (state, action) => {
      state.category.value = action.payload;
      state.seller.value = defaultState.seller.value;
      state.sorting.value = defaultState.sorting.value;
      state.priceRange.value = defaultState.priceRange.value;
      state.limit.value = defaultState.limit.value;
      state.currentPage.value = defaultState.currentPage.value;
      state.searchQuery.value = defaultState.searchQuery.value;
      
    },
    setSellerResetFilters: (state, action) => {
      state.seller.value = action.payload;
      state.category.value = defaultState.category.value;
      state.sorting.value = defaultState.sorting.value;
      state.priceRange.value = defaultState.priceRange.value;
      state.limit.value = defaultState.limit.value;
      state.currentPage.value = defaultState.currentPage.value;
      state.searchQuery.value = defaultState.searchQuery.value;
    },
    setHomePageSortResetFilters: (state, action) => {
      state.sorting.value = action.payload;
      state.seller.value = initialState.seller.value;
      state.category.value = initialState.category.value;
      state.priceRange.value = initialState.priceRange.value;
      state.limit.value = initialState.limit.value;
      state.currentPage.value = initialState.currentPage.value;
      state.searchQuery.value = initialState.searchQuery.value;
    },

    addCategory: (state, action) => {
      state.category.value = action.payload;
      state.currentPage.value = 1;

    },
    removeCategory: (state, action) => {
      state.category.value = state.category.value.filter(
        (c) => c !== action.payload
      );
      state.currentPage.value = 1;
    },
    addSeller: (state, action) => {
      state.seller.value = action.payload;
      state.currentPage.value = 1;
    },
    removeSeller: (state, action) => {
      state.seller.value = state.seller.value.filter(
        (s) => s !== action.payload
      );
      state.currentPage.value = 1;
    },
    setPriceRange: (state, action) => {
      state.priceRange.value = action.payload;
      state.currentPage.value = 1;
    },
    setSortAndOrder: (state, action) => {
      state.sorting.value = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage.value = action.payload;
    },
    addSearchQuery: (state, action) => {
      state.searchQuery.value = action.payload;
      state.currentPage.value = 1;
    },
    removeHomePageSort: (state) => {
      state.sorting.value = defaultState.sorting.value;
    },
    removeSearchQuery: (state) => {
      state.searchQuery.value = "";
      state.currentPage.value = 1;
    },
  },
});

export const {
  resetFilters,
  setCategoryResetFilters,
  setSellerResetFilters,
  setHomePageSortResetFilters,
  addCategory,
  removeCategory,
  addSeller,
  removeSeller,
  setPriceRange,
  setSortAndOrder,
  setPage,
  addSearchQuery,
  removeSearchQuery,
  removeHomePageSort,
} = filtersSlice.actions;

export default filtersSlice.reducer;
