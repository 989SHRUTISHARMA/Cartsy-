import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice.jsx";
import wishlistReducer from "../features/WishlistSlice.jsx"; // ✅ keep .jsx

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});