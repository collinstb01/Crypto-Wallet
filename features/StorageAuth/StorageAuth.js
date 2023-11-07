import { createSlice } from "@reduxjs/toolkit";

const StorageAuth = createSlice({
  name: "storage",
  initialState: {
    seedPhrase: null,
    password: null,
    madeChangesMessage: "",
    sendToken: {
      to: "",
      from: "",
      amount: null,
      tokenAddress: "",
      id: "",
      symbol: "",
    },
    swapReceiveToken: {
      address: "",
      amount: "",
      chaindId: "",
      decimals: "",
      name: "",
      network: "",
      rpcURL: "",
      symbol: "",
      walletAddress: "",
    },
    swapSendToken: {
      address: "",
      amount: "",
      chaindId: "",
      decimals: "",
      name: "",
      network: "",
      rpcURL: "",
      symbol: "",
      walletAddress: "",
    },
    loadingAfterSendToken: false,
  },
  reducers: {
    setSwapReceiveToken(state, action) {
      state.swapReceiveToken.address = action.payload.address;
      state.swapReceiveToken.amount = action.payload.amount;
      state.swapReceiveToken.chaindId = action.payload.chaindId;
      state.swapReceiveToken.decimals = action.payload.decimals;
      state.swapReceiveToken.name = action.payload.name;
      state.swapReceiveToken.network = action.payload.network;
      state.swapReceiveToken.rpcURL = action.payload.rpcURL;
      state.swapReceiveToken.symbol = action.payload.symbol;
      state.swapReceiveToken.walletAddress = action.payload.walletAddress;
    },
    setSwapSendToken(state, action) {
      state.swapSendToken.address = action.payload.address;
      state.swapSendToken.amount = action.payload.amount;
      state.swapSendToken.chaindId = action.payload.chaindId;
      state.swapSendToken.decimals = action.payload.decimals;
      state.swapSendToken.name = action.payload.name;
      state.swapSendToken.network = action.payload.network;
      state.swapSendToken.rpcURL = action.payload.rpcURL;
      state.swapSendToken.symbol = action.payload.symbol;
      state.swapSendToken.walletAddress = action.payload.walletAddress;
    },
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
    setLoadingAfterSendToken(state, action) {
      state.loadingAfterSendToken = action.payload.loading;
    },
    setPasswordForNewWallet(state, action) {
      state.password = action.payload.password;
    },
  },
});

export const {
  setSwapReceiveToken,
  setSwapSendToken,
  setPassword,
  setDate,
  setSeed,
  setMCMessage,
  setSendToken,
  setLoadingAfterSendToken,
  setPasswordForNewWallet,
} = StorageAuth.actions;
export default StorageAuth.reducer;
