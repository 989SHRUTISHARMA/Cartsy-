import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // ✅ IMPORTANT
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exist = state.items.find(i => i.id === item.id);

      if (exist) {
        state.items = state.items.filter(i => i.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;