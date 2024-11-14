import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Reducers/userReducer';
import walletReducer from './Reducers/walletReducer';

const store = configureStore({
    reducer: {
        userReducer,
        walletReducer
    }
})

export default store;