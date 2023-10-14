import { configureStore } from "@reduxjs/toolkit";
import StorageAuth from "./StorageAuth/StorageAuth";

export const store = configureStore({
  reducer: {
    storage: StorageAuth,
  },
});
