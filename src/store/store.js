import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import { likedProductsReducer } from "./likedProductsSlice";
import cartReducer from "./cartSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "likedProducts", "cart"] // only persist serializable user slice
};

const rootReducer = combineReducers({
    user: userReducer,
    likedProducts: likedProductsReducer,
    cart: cartReducer
});

// Persist only the reducer, never any hooks/functions
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // ignore all redux-persist actions that might contain non-serializable values
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                    'persist/REGISTER'
                ]
            }
        })
});

export const persistor = persistStore(store);
