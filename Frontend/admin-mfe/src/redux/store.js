import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./adminAuthSlice";

const store = configureStore({
  reducer: {
    auth: adminAuthReducer, 
  },
});

export default store;
