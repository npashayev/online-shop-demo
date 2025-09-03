import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice';
import { likedProductsReducer } from "./likedProductsSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "likedProducts"] // only persist serializable user slice
};

const rootReducer = combineReducers({
    user: userReducer,
    likedProducts: likedProductsReducer
});

// Persist only the reducer, never any hooks/functions
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

export const persistor = persistStore(store);
