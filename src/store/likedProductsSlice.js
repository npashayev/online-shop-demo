import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    byId: {},
    allIds: []
}

const likedProductsSlice = createSlice({
    name: "likedProducts",
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const product = action.payload
            const id = product.id

            if (state.byId[id]) {
                delete state.byId[id]
                state.allIds = state.allIds.filter(pid => pid !== id)
            } else {
                state.byId[id] = product;
                state.allIds.push(id)
            }
        },
        resetLikedProducts: (state) => {
            state.byId = {}
            state.allIds = []
        }
    }
})


export const { toggleLike, resetLikedProducts } = likedProductsSlice.actions;
export const likedProductsReducer = likedProductsSlice.reducer;



// Memorized selector
const selectLikedProductsState = state => state.likedProducts;

export const selectLikedProducts = createSelector(
    [selectLikedProductsState],
    likedProducts => likedProducts.allIds.map(id => likedProducts.byId[id])
)