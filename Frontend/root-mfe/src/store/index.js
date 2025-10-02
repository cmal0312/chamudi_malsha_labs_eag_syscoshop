import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoriesReducer from "./categoriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export default store;
