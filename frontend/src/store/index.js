// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import materialReducer from "./materialSlice";
import productReducer from "./productSlice";
import supplierReducer from "./supplierSlice";
import unitReducer from "./unitSlice";
import bomReducer from "./bomSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    materials: materialReducer,
    products: productReducer,
    suppliers: supplierReducer,
    units: unitReducer,
    boms: bomReducer,
    user: userSlice,
  },
});

export default store;
