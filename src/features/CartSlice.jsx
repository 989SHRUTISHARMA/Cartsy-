import { createSlice } from "@reduxjs/toolkit";

// ================= LOAD FROM LOCALSTORAGE =================
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCart(),
};

// ================= SAVE TO LOCALSTORAGE =================
const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    // ================= ADD TO CART =================
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((i) => i.id === item.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      saveCart(state.items);
    },

    // ================= REMOVE =================
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCart(state.items);
    },

    // ================= INCREASE =================
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;

      saveCart(state.items);
    },

    // ================= DECREASE =================
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.id !== action.payload
          );
        }
      }

      saveCart(state.items);
    },

    // ================= CLEAR CART =================
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;