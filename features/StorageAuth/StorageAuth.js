import { createSlice } from "@reduxjs/toolkit";

const StorageAuth = createSlice({
  name: "storage",
  initialState: {
    seedPhrase: null,
    message: "Initial message",
  },
  reducers: {
    setSeed(state, action) {
      state.seedPhrase = action.payload.seedPhrase;
    },
  },
});

export const { setPassword, setDate, setSeed } = StorageAuth.actions;
export default StorageAuth.reducer;
