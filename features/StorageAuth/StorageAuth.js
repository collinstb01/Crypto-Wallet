import { createSlice } from "@reduxjs/toolkit";

const StorageAuth = createSlice({
  name: "storage",
  initialState: {
    seedPhrase: null,
    madeChangesMessage: "",
  },
  reducers: {
    setSeed(state, action) {
      state.seedPhrase = action.payload.seedPhrase;
    },
    setMCMessage(state, action) {
      state.seedPhrase = action.payload.changes;
    },
  },
});

export const { setPassword, setDate, setSeed, setMCMessage } =
  StorageAuth.actions;
export default StorageAuth.reducer;
