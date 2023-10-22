import { createSlice } from "@reduxjs/toolkit";

const StorageAuth = createSlice({
  name: "storage",
  initialState: {
    seedPhrase: null,
    madeChangesMessage: "",
    sendToken: {
      to: "",
      from: "",
      amount: null,
      tokenAddress: "",
      id: "",
      symbol: "",
    },
  },
  reducers: {
    setSeed(state, action) {
      state.seedPhrase = action.payload.seedPhrase;
    },
    setMCMessage(state, action) {
      state.seedPhrase = action.payload.changes;
    },
    setSendToken(state, action) {
      state.sendToken.to = action.payload.to;
      state.sendToken.from = action.payload.from;
      state.sendToken.amount = action.payload.amount;
      state.sendToken.id = action.payload.id;
      state.sendToken.tokenAddress = action.payload.tokenAddress;
      state.sendToken.symbol = action.payload.symbol;
    },
  },
});

export const { setPassword, setDate, setSeed, setMCMessage, setSendToken } =
  StorageAuth.actions;
export default StorageAuth.reducer;
