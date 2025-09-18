import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
})

export default cartSlice.reducer;