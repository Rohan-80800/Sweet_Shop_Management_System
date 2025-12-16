import { createSlice } from "@reduxjs/toolkit";

const sweetsSlice = createSlice({
  name: "sweets",
  initialState: {
    sweets: [],
    categories: ["All"],
    loading: false,
    error: null
  },
  reducers: {
    setSweets: (state, action) => {
      state.sweets = action.payload.map((sweet) => ({
        ...sweet
      }));
      const uniqueCategories = [
        ...new Set(action.payload.map((sweet) => sweet.category))
      ].sort();
      state.categories = ["All", ...uniqueCategories];
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addSweetLocal: (state, action) => {
      const newSweet = {
        ...action.payload
      };
      state.sweets.push(newSweet);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
        state.categories.sort();
        state.categories = ["All", ...state.categories.slice(1)];
      }
    },
    updateSweetLocal: (state, action) => {
      const index = state.sweets.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.sweets[index] = {
          ...action.payload
        };
        const uniqueCategories = [
          ...new Set(state.sweets.map((s) => s.category))
        ].sort();
        state.categories = ["All", ...uniqueCategories];
      }
    },
    deleteSweetLocal: (state, action) => {
      state.sweets = state.sweets.filter((s) => s._id !== action.payload);
      const uniqueCategories = [
        ...new Set(state.sweets.map((s) => s.category))
      ].sort();
      state.categories = ["All", ...uniqueCategories];
    },
    updateStockLocal: (state, action) => {
      const index = state.sweets.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.sweets[index] = {
          ...action.payload,
          color: state.sweets[index].color
        };
      }
    },
    updateSweetQuantity: (state, action) => {
      const { sweetId, quantity } = action.payload;
      const sweet = state.sweets.find((s) => s._id === sweetId);
      if (sweet) {
        sweet.quantity -= quantity;
      }
    }
  }
});

export const {
  setSweets,
  setLoading,
  setError,
  addSweetLocal,
  updateSweetLocal,
  deleteSweetLocal,
  updateStockLocal,
  updateSweetQuantity
} = sweetsSlice.actions;
export default sweetsSlice.reducer;
