import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cartItem = {
        itemName: action.payload.itemName,
        itemPrice: action.payload.itemPrice,
        itemQuantity: action.payload.itemQuantity,
        itemImage: action.payload.itemImage,
      };

      console.log(cartItem);
      return {
        ...state,
        cartItems: [...state.cartItems, cartItem],
      };
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
