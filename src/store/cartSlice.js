import { createSlice } from "@reduxjs/toolkit";

// function to calculate price for single product
const calcTotalPrice = product => Number(((product.price - product.price * product.discountPercentage / 100) * product.quantity).toFixed(2));

const updateProductsTotalPrice = products => products.map(p => ({ ...p, totalPrice: calcTotalPrice(p) }))

// helper function to calculate totals
const calculateCartTotals = products => {
    const totalPrice = products.reduce((acc, p) => acc + calcTotalPrice(p), 0).toFixed(2);
    const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalProducts = products.length;

    return { totalPrice, totalQuantity, totalProducts };
};

// Helper to update the state totals
const updateCartTotals = state => {
    const totals = calculateCartTotals(state.products);
    state.totalPrice = totals.totalPrice;
    state.totalQuantity = totals.totalQuantity;
    state.totalProducts = totals.totalProducts;
};

const initialState = {
    products: [],
    totalPrice: 0,
    totalProducts: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart: (state) => {
            state.products = []
            state.totalPrice = 0
            state.totalProducts = 0
            state.totalQuantity = 0
        },
        addProduct: (state, action) => {
            const productWithTotal = { ...action.payload, totalPrice: calcTotalPrice(action.payload) };
            state.products.unshift(productWithTotal)
            updateCartTotals(state)
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload)
            updateCartTotals(state)
        },
        changeProductQuantity: (state, action) => {
            state.products = state.products.map(p => p.id === action.payload.productId
                ? {
                    ...p,
                    quantity: p.quantity + action.payload.changeValue,
                }
                : p
            )
            state.products = updateProductsTotalPrice(state.products)
            updateCartTotals(state)
        }
    },
})

export const { resetCart, addProduct, deleteProduct, changeProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const isProductExist = (state, product) => state.cart.products.some(p => p.id === product.id)