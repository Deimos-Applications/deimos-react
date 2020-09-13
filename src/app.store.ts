import { configureStore } from "@reduxjs/toolkit";

import exampleReducer from "./modules/example/example.slice";
import authReducer from "./modules/auth/auth.slice";

const store = configureStore({
  reducer: {
    example: exampleReducer,
    auth: authReducer,
  },
});

export default store;
