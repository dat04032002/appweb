
import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    productList: localStorage.getItem("productList") 
    ? JSON.parse(localStorage.getItem("productList")):[],    
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("action", action.payload);
      const findIndexItem = state.productList.findIndex(product => product.id === action.payload.id);
      if (findIndexItem >=0) {
        state.productList[findIndexItem].quantity += 1;
      } else {
        state.productList = [...state.productList, {...action.payload, quantity: 1}]; // Add quantity property here
      }
      localStorage.setItem("productList", JSON.stringify(state.productList));
    },
    removeProduct: (state, action) => {
      console.log("action", action.payload);
      state.productList = state.productList.filter(el => el.id !== action.payload.id);
      localStorage.setItem("productList", JSON.stringify(state.productList)); // Cập nhật lại localStorage
    },
    decreaseQuantity: (state, action) => {
      const findIndexItem = state.productList.findIndex(product => product.id === action.payload?.id);
      if (state.productList[findIndexItem].quantity !== 1) { // Check quantity here
        state.productList[findIndexItem].quantity -= 1;
      }
    },
    increaseQuantity: (state, action) => {
      const findIndexItem = state.productList.findIndex(product => product.id === action.payload?.id);
      state.productList[findIndexItem].quantity += 1;
    },
  }
});


export const { addProduct, removeProduct,decreaseQuantity,  increaseQuantity,  } =productSlice.actions;

export default productSlice.reducer;
