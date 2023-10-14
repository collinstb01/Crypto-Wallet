import { createSlice } from "@reduxjs/toolkit";

const StorageAuth = createSlice({
  name: "storage",
  initialState: {
    password: "",
    seedPhrase: "",
    date: "",
    message: "Initial message",
  },
  reducers: {
    setPassword(state, action) {
      state.password = action.payload.password;
    },
    setSeed(state, action) {
      state.seedPhrase = action.payload.seedPhrase;
    },
    setDate(state, action) {
      state.date = action.payload.date;
    },
  },
});

export const { setPassword, setDate, setSeed } = StorageAuth.actions;
export default StorageAuth.reducer;
