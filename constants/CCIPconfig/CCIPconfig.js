import AsyncStorage from "@react-native-async-storage/async-storage";

export const supportedNetworks = [
  {
    sourceName: "ethereumMainnet",
    name: "Ethereum Mainnet",
    color: "green",
  },
  {
    sourceName: "ethereumSepolia",
    name: "Ethereum Sepolia",
    color: "blue",
  },
  {
    sourceName: "optimismMainnet",
    name: "Optimism Mainnet",
    color: "orange",
  },
  {
    sourceName: "optimismGoerli",
    name: "Optimism Goerli",
    color: "red",
  },
  {
    sourceName: "arbitrumTestnet",
    name: "Arbitrum Testnet",
    color: "gray",
  },
  {
    sourceName: "avalancheMainnet",
    name: "Avalanche Mainnet",
    color: "wheat",
  },
  {
    sourceName: "avalancheFuji",
    name: "Avalanche Fuji",
    color: "purple",
  },
  {
    sourceName: "polygonMainnet",
    name: "Polygon Mainnet",
    color: "pink",
  },
  {
    sourceName: "polygonMumbai",
    name: "Polygon Mumbai",
    color: "brown",
  },
];

const ethereumMainnet = {
  address: "0xE561d5E02207fb5eB32cca20a699E0d8919a1476",
  chainSelector: "5009297550715157269",
};

const ethereumSepolia = {
  address: "0xd0daae2231e9cb96b94c8512223533293c3693bf",
  chainSelector: "16015286601757825753",
};

const optimismMainnet = {
  address: "0x261c05167db67B2b619f9d312e0753f3721ad6E8",
  chainSelector: "3734403246176062136",
};

const optimismGoerli = {
  address: "0xeb52e9ae4a9fb37172978642d4c141ef53876f26",
  chainSelector: "2664363617261496610",
};

const avalancheMainnet = {
  address: "0x27F39D0af3303703750D4001fCc1844c6491563c",
  chainSelector: "6433500567565415381",
};

const avalancheFuji = {
  address: "0x554472a2720e5e7d5d3c817529aba05eed5f82d8",
  chainSelector: "14767482510784806043",
};

const arbitrumTestnet = {
  address: "0x88e492127709447a5abefdab8788a15b4567589e",
  chainSelector: "6101244977088475029",
};

const polygonMainnet = {
  address: "0x3C3D92629A02a8D95D5CB9650fe49C3544f69B43",
  chainSelector: "4051577828743386545",
};

const polygonMumbai = {
  address: "0x70499c328e1e2a3c41108bd3730f6670a44595d1",
  chainSelector: "12532609583862916517",
};

export const getRouterConfig = (network) => {
  switch (network) {
    case "ethereumMainnet":
      return ethereumMainnet;
    case "ethereumSepolia":
      return ethereumSepolia;
    case "optimismMainnet":
      return optimismMainnet;
    case "optimismGoerli":
      return optimismGoerli;
    case "arbitrumTestnet":
      return arbitrumTestnet;
    case "avalancheMainnet":
      return avalancheMainnet;
    case "avalancheFuji":
      return avalancheFuji;
    case "polygonMainnet":
      return polygonMainnet;
    case "polygonMumbai":
      return polygonMumbai;
    default:
      throw new Error("Unknown network: " + network);
  }
};

export const getProviderRpcUrl = (network) => {
  let rpcUrl;

  switch (network) {
    case "ethereumMainnet":
      rpcUrl = process.env.ETHEREUM_MAINNET_RPC_URL;
      break;
    case "ethereumSepolia":
      rpcUrl =
        process.env.ETHEREUM_SEPOLIA_RPC_URL ||
        "https://eth-sepolia.g.alchemy.com/v2/ZkFgCAUBdigtKoqowEjqdlyfjchhbvmg";
      break;
    case "optimismMainnet":
      rpcUrl = process.env.OPTIMISM_MAINNET_RPC_URL;
      break;
    case "optimismGoerli":
      rpcUrl = process.env.OPTIMISM_GOERLI_RPC_URL;
      break;
    case "arbitrumTestnet":
      rpcUrl = process.env.ARBITRUM_TESTNET_RPC_URL;
      break;
    case "avalancheMainnet":
      rpcUrl = process.env.AVALANCHE_MAINNET_RPC_URL;
      break;
    case "avalancheFuji":
      rpcUrl = process.env.AVALANCHE_FUJI_RPC_URL;
      break;
    case "polygonMainnet":
      rpcUrl = process.env.POLYGON_MAINNET_RPC_URL;
      break;
    case "polygonMumbai":
      rpcUrl =
        process.env.POLYGON_MUMBAI_RPC_URL ||
        "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ";
      break;
    default:
      throw new Error("Unknown network: " + network);
  }

  if (!rpcUrl)
    throw new Error(
      `rpcUrl empty for network ${network} - check your environment variables`
    );
  return rpcUrl;
};
