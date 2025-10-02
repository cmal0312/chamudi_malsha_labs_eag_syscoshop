import { configureStore } from "@reduxjs/toolkit";
import supplierAuthReducer from "./supplierAuthSlice";

const store = configureStore({
  reducer: {
    auth: supplierAuthReducer, 
  },
});

export default store;
