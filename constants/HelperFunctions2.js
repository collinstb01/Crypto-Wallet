import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { encryptionKey } from "../constants/DATA";
import { ethers, Wallet, HDNodeWallet } from "ethers";
import axios from "axios";
import { Share } from "react-native";
import { Alert } from "react-native";
import { schedulePushNotification } from "../components/SendNotification";

export const _checkPasswordStrength = ({ password, setPS }) => {
  if (password.length <= 6) {
    return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    return setPS((e) => ({ ...e, color: "green", stength: "Strong" }));
  }

  // number and letter
  if (/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(password)) {
    return setPS((e) => ({ ...e, color: "#efa02c", stength: "Weak" }));
  }
  return setPS((e) => ({ ...e, color: "red", stength: "Poor" }));
};

export const _helperFunc = ({ error, loading, setErr, setLoading }) => {
  setErr(error);
  setLoading(loading);

  setTimeout(() => {
    setErr("");
  }, 5000);
};

export const _login = async ({
  password,
  setErr,
  setLoading,
  navigation,
  route,
  setShowSeedPhrase,
}) => {
  //compare with the one in the backedn
  setLoading(true);

  const user = await AsyncStorage.getItem("user");
  let parsedUser = JSON.parse(user);

  const decryptPassword = await _decryotData({
    encryptedData: parsedUser.password,
  });
  if (password == "") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password field can not be empty",
      loading: false,
    });
  }

  if (password !== decryptPassword) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password is not correct",
      loading: false,
    });
  }

  if (route == "show") {
    setShowSeedPhrase(true);
    return;
  }
  navigation.navigate(route);
};

export const _changePassword = async ({
  password,
  newPassword,
  setSuccessMsg,
  setErr,
  setLoading,
  navigation,
  route,
}) => {
  //compare with the one in the backedn
  setLoading(true);

  const user = await AsyncStorage.getItem("user");
  let parsedUser = JSON.parse(user);

  const decryptPassword = await _decryotData({
    encryptedData: parsedUser.password,
  });
  if (password == "" || newPassword == "") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Fields can not be empty",
      loading: false,
    });
  }

  if (password !== decryptPassword) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password is not correct",
      loading: false,
    });
  }

  if (decryptPassword == newPassword) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Please enter a different password",
      loading: false,
    });
  }

  if (newPassword.length < 6) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Length must be more than 6 characters",
      loading: false,
    });
  }

  parsedUser.password = await _encryotData({ data: newPassword });
  await AsyncStorage.setItem("user", JSON.stringify(parsedUser));

  _helperFunc({
    error: "Successfully Changed your password",
    loading: false,
    setErr: setSuccessMsg,
    setLoading: setLoading,
  });
};

export const _createUserAccount = async ({
  password,
  confirmPassword,
  setErr,
  setLoading,
  passwordStrength,
  agreed,
  navigation,
  route,
  seedPrase,
}) => {
  setLoading(true);
  if (password == "" || confirmPassword == "") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Please both fields are required.",
      loading: false,
    });
  }

  if (password.length <= 6) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Length must be more than 6 characters",
      loading: false,
    });
  }

  if (password !== confirmPassword) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Doesn't Match,Please try again.",
      loading: false,
    });
  }

  if (passwordStrength.stength == "Poor") {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Password Too Weak, Should contain both alphabets or numbers.",
      loading: false,
    });
  }

  if (agreed == false) {
    return _helperFunc({
      setErr,
      setLoading,
      error: "Pleae Agreed to EllAssest Terms.",
      loading: false,
    });
  }
  const encryptedData = CryptoJS.AES.encrypt(
    password,
    encryptionKey
  ).toString();

  // hasing Password
  // const decryptedData = CryptoJS.AES.decrypt(
  //   encryptedData,
  //   encryptionKey
  // ).toString(CryptoJS.enc.Utf8);

  if (seedPrase) {
    const encryptedseedPrase = CryptoJS.AES.encrypt(
      seedPrase,
      encryptionKey
    ).toString();

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ password: encryptedData, seedPrase: encryptedseedPrase })
    );
  } else {
    // await AsyncStorage.setItem(
    //   "user",
    //   JSON.stringify({ password: encryptedData, seedPrase: "" })
    // );
  }
  if (route == "") {
    if (seedPrase == "") {
      return _helperFunc({
        error: "Seed Phrase is required.",
        loading: false,
        setErr,
        setLoading,
      });
    }
    let seedPhraseVerification = seedPrase.split(" ");
    if (seedPhraseVerification.length != 12) {
      return _helperFunc({
        error: "Seed Phrase not correct, Please check and try again.",
        loading: false,
        setErr,
        setLoading,
      });
    }

    const path = "m/44'/60'/0'/0/0";

    const walletPhraseData = ethers.Wallet.fromPhrase(seedPrase, path);

    const encryptedPrivateKey = await _encryotData({
      data: walletPhraseData.privateKey,
    });

    const encryptedWalletAddress = await _encryotData({
      data: walletPhraseData.address,
    });

    let wallet = {
      walletAddress: encryptedWalletAddress,
      privateKey: encryptedPrivateKey,
      name: "",
      active: 1,
      walletName: "",
    };

    let networks = [
      {
        name: "Ethereum main Network",
        id: "eth",
        active: 1,
        color: "6c62c5",
        rpcURL:
          "https://eth-mainnet.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        chainId: 1,
        sourceChainSelector: "ethereumMainnet",
      },
      {
        name: "Sepolia Test Network",
        id: "sepolia",
        active: 0,
        color: "ff3a58",
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ZkFgCAUBdigtKoqowEjqdlyfjchhbvmg",
        chainId: 11155111,
        sourceChainSelector: "ethereumSepolia",
      },
      {
        name: "Arbitrum Goerli",
        id: "arbitrumGoerli",
        active: 0,
        color: "a769ec",
        rpcURL:
          "https://arbitrum-goerli.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        chainId: 421613,
        sourceChainSelector: "avalancheFuji",
      },
      {
        name: "Polygon Mumbai",
        id: "polygonMumbai",
        active: 0,
        color: "0000FF",
        rpcURL:
          "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ",
        chainId: 80001,
        sourceChain: "polygonMumbai",
      },
    ];
    const tokens = [
      {
        name: "Ethereum main Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[0].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
        chaindId: 1,
        rpcURL:
          "https://eth-mainnet.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        sourceChainSelector: "ethereumMainnet",
      },
      {
        name: "Sepolia Test Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[1].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
        chainId: 11155111,
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ZkFgCAUBdigtKoqowEjqdlyfjchhbvmg",
        sourceChainSelector: "ethereumSepolia",
      },
      {
        name: "Arbitrum Goerli",
        amount: Number(
          await getBalance({
            rpcURL: networks[2].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "arbitrumGoerli",
        address: "0x0000000000000000000000000000000000000000",
        network: "arbitrumGoerli",
        walletAddress: encryptedWalletAddress,
        chainId: 421613,
        rpcURL:
          "https://arbitrum-goerli.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        sourceChainSelector: "avalancheFuji",
      },
      {
        name: "Polygon Mumbai",
        amount: Number(
          await getBalance({
            rpcURL: networks[3].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "polygonMumbai",
        address: "0x0000000000000000000000000000000000000000",
        network: "polygonMumbai",
        walletAddress: encryptedWalletAddress,
        chainId: 80001,
        rpcURL:
          "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ",
        sourceChainSelector: "polygonMumbai",
      },
    ];

    // console.log(walletPhraseData.address);
    // let historys = await _getUserTransactions({
    //   WalletAddress: walletPhraseData.address,
    // });
    await AsyncStorage.setItem("wallets", JSON.stringify([wallet]));
    await AsyncStorage.setItem("tokens", JSON.stringify(tokens)); //
    await AsyncStorage.setItem("networks", JSON.stringify(networks)); // done
    await AsyncStorage.setItem("TXhistory", JSON.stringify([])); // done
    await AsyncStorage.setItem("recents", JSON.stringify([]));

    navigation.navigate("home");
  } else {
    navigation.navigate(route);
  }
};

export const _getActiveNetwork = async () => {
  const activeNetwork = await AsyncStorage.getItem("networks");
  const parseNetwork = JSON.parse(activeNetwork);
  let filterNetwork = parseNetwork.find((val) => val.active == 1);

  return JSON.stringify(filterNetwork);
};

export const _getNetworks = async () => {
  let _networks = await AsyncStorage.getItem("networks");
  let parseData = JSON.parse(_networks);
  let networks = parseData.filter((val) => val.active == 0);

  return JSON.stringify(networks);
};

export const _setNetworks = async ({ id }) => {
  let _network = await AsyncStorage.getItem("networks");
  // find active and set it to 0
  // find new active and change to 1
  let parseNetwork = JSON.parse(_network);
  const active = parseNetwork.find((val) => val.active == 1);
  const soonToBeactive = parseNetwork.find((val) => val.id == id);

  active.active = 0;
  soonToBeactive.active = 1;

  await AsyncStorage.setItem("networks", JSON.stringify(parseNetwork));
  return true;
};

export const _getActiveWallet = async () => {
  const activeWallet = await AsyncStorage.getItem("wallets");
  const parseWallet = JSON.parse(activeWallet);
  let filterWallet = parseWallet.find((val) => val.active == 1);

  return JSON.stringify(filterWallet);
};

export const _getWallets = async () => {
  let _wallet = await AsyncStorage.getItem("wallets");

  return _wallet;
};
export const _createWallet = async ({
  walletName,
  setLoading,
  setError,
  setShow,
  privateKey,
}) => {
  try {
    let wallets = await AsyncStorage.getItem("wallets");
    let tokens = await AsyncStorage.getItem("tokens");
    let parseWallets = JSON.parse(wallets);
    let parseTokens = JSON.parse(tokens);

    let activeWallet = parseWallets.find((val) => val.active == 1);
    activeWallet.active = 0;

    if (parseWallets.find((val) => val.name == walletName)) {
      _helperFunc({
        error: "Name Already exist, use another Account Name.",
        loading: false,
        setErr: setError,
        setLoading: setLoading,
      });

      return;
    }

    let encryptedWalletAddress, encryptedPrivateKey, address;
    if (privateKey !== "") {
      let wallet = new ethers.Wallet(privateKey.toString());
      address = wallet.address;

      encryptedWalletAddress = await _encryotData({ data: address });
      encryptedPrivateKey = await _encryotData({ data: privateKey });
    } else {
      let user = await AsyncStorage.getItem("user");
      let mnemonic = JSON.parse(user).seedPrase;

      let decryptMnemonic = await _decryotData({ encryptedData: mnemonic });

      const addressIndex = Math.floor(Math.random() * 2 ** 31); // Random address index
      const path = `m/44'/60'/${"0"}/${"0"}/${addressIndex}`;

      const wallet = HDNodeWallet.fromPhrase(decryptMnemonic, undefined, path);

      address = wallet.address;
      encryptedWalletAddress = await _encryotData({
        data: wallet.address,
      });
      encryptedPrivateKey = await _encryotData({
        data: wallet.privateKey,
      });
    }

    let walletObj = {
      walletAddress: encryptedWalletAddress,
      privateKey: encryptedPrivateKey,
      name: "",
      active: 1,
      walletName: walletName,
    };

    const tokensArr = [
      {
        name: "Ethereum main Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[0].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
        chaindId: 1,
        rpcURL:
          "https://eth-mainnet.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        sourceChainSelector: "ethereumMainnet",
      },
      {
        name: "Sepolia Test Network",
        amount: Number(
          await getBalance({
            rpcURL: networks[1].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
        chainId: 11155111,
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ZkFgCAUBdigtKoqowEjqdlyfjchhbvmg",
        sourceChainSelector: "ethereumSepolia",
      },
      {
        name: "Arbitrum Goerli",
        amount: Number(
          await getBalance({
            rpcURL: networks[2].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "arbitrumGoerli",
        address: "0x0000000000000000000000000000000000000000",
        network: "arbitrumGoerli",
        walletAddress: encryptedWalletAddress,
        chainId: 421613,
        rpcURL:
          "https://arbitrum-goerli.blastapi.io/f2bc55e4-f583-4370-891d-5885b319d05a",
        sourceChainSelector: "avalancheFuji",
      },
      {
        name: "Polygon Mumbai",
        amount: Number(
          await getBalance({
            rpcURL: networks[3].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "polygonMumbai",
        address: "0x0000000000000000000000000000000000000000",
        network: "polygonMumbai",
        walletAddress: encryptedWalletAddress,
        chainId: 80001,
        rpcURL:
          "https://polygon-mumbai.g.alchemy.com/v2/v5XGTeB99ScNm1Kr5N7y_GsR0hT2NOsZ",
        sourceChainSelector: "polygonMumbai",
      },
    ];

    let newArr = [...parseTokens, ...tokensArr];

    parseWallets.push(walletObj);
    await AsyncStorage.setItem("wallets", JSON.stringify(parseWallets));
    await AsyncStorage.setItem("tokens", JSON.stringify(newArr));

    setShow(false);
  } catch (error) {
    _helperFunc({
      error: "Something went wrong, Please try again.",
      loading: false,
      setErr: setError,
      setLoading: setLoading,
    });

    console.log(error);
  }
};

export const _setWallets = async ({ walletAddress }) => {
  let _wallet = await AsyncStorage.getItem("wallets");
  // find active and set it to 0
  // find new active and change to 1

  let parseNetwork = JSON.parse(_wallet);
  const active = parseNetwork.find((val) => val.active == 1);
  const soonToBeactive = parseNetwork.find(
    (val) => val.walletAddress == walletAddress
  );

  active.active = 0;
  soonToBeactive.active = 1;

  await AsyncStorage.setItem("wallets", JSON.stringify(parseNetwork));
  return true;
};

export const _encryotData = async ({ data }) => {
  const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();

  return encryptedData;
};

export const _decryotData = async ({ encryptedData }) => {
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedData,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

/////TOKENS/////

export const _getTokens = async () => {
  const activeNetwork = await _getActiveNetwork();
  let parseActiveNetwork = JSON.parse(activeNetwork);

  const activeWallet = await _getActiveWallet();
  let parseActiveWactiveWallet = JSON.parse(activeWallet);

  const tokens = await AsyncStorage.getItem("tokens");

  let d = JSON.parse(tokens).filter(
    (val) => val.network == parseActiveNetwork.id
  );

  let final = d.filter(
    (val) => val.walletAddress == parseActiveWactiveWallet.walletAddress
  );
  return JSON.stringify(final);
};

export const _getTokenDetail = async ({ addr, setErr, setLoading }) => {
  try {
    const activeNetwork = await _getActiveNetwork();
    const activeWallet = await _getActiveWallet();
    let parseActiveNetwork = JSON.parse(activeNetwork);
    let parseActiveWallet = JSON.parse(activeWallet);

    let abi = await getContractAbi({
      contractAddress: addr,
    });

    let provider = new ethers.JsonRpcProvider(parseActiveNetwork.rpcURL);

    let userWalletAddress = await _decryotData({
      encryptedData: parseActiveWallet.walletAddress,
    });

    const contract = new ethers.Contract(addr, abi, provider);
    let userTokenBalance;
    try {
      userTokenBalance = await contract.balanceOf(userWalletAddress);
    } catch (error) {
      setLoading(false);
      setErr("Token does not exist on this chain");
      return;
    }

    let name = await contract.name();
    let decimals = Number(await contract.decimals());
    let symbol = await contract.symbol();
    let balance = Number(userTokenBalance);
    let id = parseActiveNetwork.id;
    let walletAddress = parseActiveWallet.walletAddress;

    return JSON.stringify({
      name,
      decimals,
      symbol,
      balance,
      addr,
      id,
      walletAddress,
    });
  } catch (error) {
    console.log(error);
    // setErr("Token does not exist on this chain");
  }
};

export const _addTokens = async ({
  addr,
  symbol,
  balance,
  name,
  decimals,
  id,
  setErr,
  walletAddress,
  navigation,
}) => {
  const tokens = await AsyncStorage.getItem("tokens");
  const activeNetwork = await _getActiveNetwork();
  let parseActiveNetwork = JSON.parse(activeNetwork);

  const parseTokens = JSON.parse(tokens);

  if (
    JSON.parse(tokens)
      .filter((val) => val.walletAddress == walletAddress)
      .find((val) => val.address == addr)
  ) {
    return setErr("Already Listed");
  }

  // let API_KEY = "3d24b57ebfb8442bb83583ed476e0133";

  const token = {
    name: name,
    amount: ethers.formatEther(balance.toString()),
    symbol: symbol,
    address: addr,
    network: id,
    walletAddress: walletAddress,
    decimals: decimals,
    chaindId: parseActiveNetwork.chainId,
    rpcURL: parseActiveNetwork.rpcURL,
    sourceChainSelector: parseActiveNetwork?.sourceChainSelector,
  };

  parseTokens.push(token);
  await AsyncStorage.setItem("tokens", JSON.stringify(parseTokens));
  navigation.navigate("home");
};

export const removeToken = async () => {};

async function getContractAbi({ contractAddress }) {
  try {
    // const response = await axios.get(
    //   `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`
    // );

    let abi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    return abi;
  } catch (error) {
    console.log(error);
  }
}

export const _getUserTransactions = async () => {
  const data = await AsyncStorage.getItem("TXhistory");

  return data;
};

export const _getUserTokenTransactions = async ({
  contractAddress,
  symbol,
}) => {
  const data = await AsyncStorage.getItem("TXhistory");
  const parseData = JSON.parse(data);

  let TokenHistory = parseData.filter(
    (item) => item.contractAddress == contractAddress
  );

  return JSON.stringify(TokenHistory);
};

export const _getrecentsAddressSentTo = async () => {
  const recentsAddressSentTo = await AsyncStorage.getItem("recents");

  if (!recentsAddressSentTo) {
    return false;
  }

  return JSON.stringify(recentsAddressSentTo);
};

export const getBalance = async ({ rpcURL, address }) => {
  const provider = new ethers.JsonRpcProvider(rpcURL);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.formatEther(balance);
  return balanceInEth;
};

export const eventListening = async () => {
  // Initialize a provider

  const tokens = await AsyncStorage.getItem("tokens");
  const parseTokens = JSON.parse(tokens);

  const networks = await AsyncStorage.getItem("networks");
  const parsenetworks = JSON.parse(networks);

  for (let i = 0; i < parseTokens.length; i++) {
    const element = parseTokens[i];
    let rpcURL = parsenetworks.find((val) => val.id == element.network);
    const provider = new ethers.JsonRpcProvider(rpcURL.rpcURL);

    const walletAddress = await _decryotData({
      encryptedData: element.walletAddress,
    });

    if (element.address == "0x0000000000000000000000000000000000000000") {
      // Listen for new blocks

      provider.on("block", async (blockNumber) => {
        // Get the block details
        console.log(`New block mined: ${blockNumber}`);

        // Fetch the block
        const block = await provider.getBlock(blockNumber);

        console.log(block);

        if (block && block.transactions) {
          for (const txHash of block.transactions) {
            const tx = await provider.getTransaction(txHash);

            console.log(tx);
            // Check if the transaction involves the specified wallet address
            if (tx.to === walletAddress || tx.from === walletAddress) {
              console.log(`Transaction: ${txHash}, ${tx}`);

              // let data  = parseTokens
              //   .filter((val) => val == element.walletAddress)
              //   .filter((val) => val.network == element.network);
              // push to TX history
              // update user balance
              // Process the transaction data here
            }
          }
        }
      });
    } else {
      // Specify the token contract address and ABI
      const tokenAddress = element.address;
      const tokenABI = [
        "event Transfer(address indexed from, address indexed to, uint256 value)",
      ]; // Simplified ABI

      // Create a contract instance
      const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

      // Listen for 'Transfer' events to the wallet
      contract.on("Transfer", (from, to, amount, event) => {
        if (to.toLowerCase() === walletAddress.toLowerCase()) {
          console.log(`Received a transfer of ${amount} tokens from ${from}`);
        }
      });
    }
  }
};

export const _formatAddr = async ({ addr, notEncrypted }) => {
  let address;

  if (notEncrypted == true) {
    address = addr;
  } else {
    address = await _decryotData({ encryptedData: addr });
  }

  return ` ${address.split("").splice(0, 4).join("")}.....${address
    .split("")
    .splice(34)
    .join("")}`;
};

export const _getTokenPrice = async () => {
  const contractAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"; // Replace with your contract address

  // Fetch current token price in USD from CoinGecko API
  fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=usd`
  )
    .then((response) => response.json())
    .then((data) => {
      const tokenPriceInUsd = data[contractAddress].usd;

      // Convert 1 token to USD
      const tokenAmount = 1; // Replace with the amount of tokens you want to convert
      const usdAmount = tokenAmount * tokenPriceInUsd;

      console.log(
        `1 token with contract address ${contractAddress} is worth ${usdAmount} USD`
      );
    });
};

export const _getNativePrice = async () => {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  )
    .then((response) => response.json())
    .then((data) => {
      const ethPriceInUsd = data.ethereum.usd;

      // Convert 1 ETH to USD
      const ethAmount = ethers.utils.parseEther("1");
      const usdAmount = ethAmount.mul(ethPriceInUsd);

      console.log(
        `1 ETH is worth ${ethers.utils.formatUnits(usdAmount, "ether")} USD`
      );
    });
};

export const _getGas = async ({ address, amount, recipient }) => {
  try {
    const activeNetwork = await _getActiveNetwork();
    let parseActiveNetwork = JSON.parse(activeNetwork);

    const provider = new ethers.JsonRpcProvider(parseActiveNetwork.rpcURL); // Replace 'rinkeby' with the name of the network you want to connect to

    let _recipient = await _decryotData({ encryptedData: recipient });
    // Estimate the gas price
    const gasPrice = await provider.getBlock("latest");

    // Estimate the gas amount
    const gasLEstimate = await provider.estimateGas({
      to: _recipient,
      value: ethers.parseEther("0.5"),
    });

    return JSON.stringify({
      gasPrice: Number(gasPrice.baseFeePerGas),
      gasLEstimate: Number(gasLEstimate),
    });
  } catch (error) {
    console.log("Error occured at Get Gas", error);
  }
};

export const transferNativeTokensOrERC20 = async ({
  gasPrice,
  gasLEstimate,
  recipient,
  amount,
  contractAddress,
  symbol,
  navigation,
  setErr,
  setLoading,
}) => {
  try {
    const _recipient = await _decryotData({ encryptedData: recipient });
    const walletActive = await _getActiveWallet();
    const parseWallet = JSON.parse(walletActive);

    const activeNetwork = await _getActiveNetwork();
    let parseActiveNetwork = JSON.parse(activeNetwork);

    const provider = new ethers.JsonRpcProvider(parseActiveNetwork.rpcURL);

    let tx;

    if (contractAddress == "0x0000000000000000000000000000000000000000") {
      const decryptPrivateKey = await _decryotData({
        encryptedData: parseWallet.privateKey,
      });

      // Create a wallet instance
      const wallet = new ethers.Wallet(decryptPrivateKey, provider);

      const transaction = {
        to: _recipient,
        value: ethers.parseEther(amount.toString()), // Send 1 Ether
      };

      // Send the transaction
      tx = await wallet.sendTransaction(transaction).catch((err) => {
        _helperFunc({
          setErr,
          setLoading,
          error: "An Error Occured, Gas Fee might be too low",
          loading: false,
        });
      });
    } else {
      const decryptPrivateKey = await _decryotData({
        encryptedData: parseWallet.privateKey,
      });

      const abi = [
        // Transfer function
        "function transfer(address recipient, uint256 amount) public returns (bool)",
        // Other functions go here
      ];

      // The amount of tokens to send (in the smallest unit of the token)
      const amountInWei = ethers.parseEther(amount.toString()); // Replace 'tokenDecimals' with the number of decimals the token uses
      const wallet = new ethers.Wallet(decryptPrivateKey, provider);
      const contract = new ethers.Contract(contractAddress, abi, wallet);

      // Send the transaction
      tx = await contract
        .transfer(_recipient, amountInWei, {
          // gasPrice: gasPrice,
          // gasLimit: gasLEstimate,
        })
        .catch((err) => {
          _helperFunc({
            setErr,
            setLoading,
            error: "An Error Occured, Gas Fee might be too low",
            loading: false,
          });
        });
    }

    const date = formatDateToCustomFormat();
    let TXhistoryObj = {
      userWalletAddress: parseWallet.walletAddress,
      network: parseActiveNetwork.id,
      contractAddress,
      status: "pending",
      statusNo: null,
      symbol: symbol,
      date: date,
      type: "Send",
      from: tx.from,
      to: tx.to,
      value: amount,
      gasUsed: "",
      gasLimit: Number(tx.gasLimit),
      gasPrice: null,
      blockHash: tx.blockHash,
      blockNumber: null,
      timeStamp: "",
      nonce: Number(tx.nonce),
      hash: tx.hash,
      chainId: Number(tx.chainId),
    };

    const TXhistory = await AsyncStorage.getItem("TXhistory");
    const parseTXhistory = JSON.parse(TXhistory);
    parseTXhistory.push(TXhistoryObj);

    await AsyncStorage.setItem("TXhistory", JSON.stringify(parseTXhistory));
    navigation.navigate("transactions", { tokenName: "1INCH" });

    await confirmTX({
      transactionHash: tx.hash,
      network: parseActiveNetwork.id,
      userWalletAddress: parseWallet.walletAddress,
      contractAddress,
      provider,
      parseWallet,
      symbol,
      rpcURL: parseActiveNetwork.rpcURL,
    });
  } catch (error) {
    console.log("An error occured at transfer native token", error);
  }
};

export const confirmTX = async ({
  transactionHash,
  network,
  userWalletAddress,
  contractAddress,
  provider,
  symbol,
  rpcURL,
}) => {
  const tokens = await AsyncStorage.getItem("tokens");
  const parseTokens = JSON.parse(tokens);
  let dencryptUserWalletAddr = await _decryotData({
    encryptedData: userWalletAddress,
  });

  let userData = parseTokens
    .filter((val) => val.walletAddress == userWalletAddress)
    .filter((val) => val.address == contractAddress)
    .filter((val) => val.symbol == symbol);

  const confirms = 6; // Number of confirmations required
  const timeout = 120000; // Timeout in milliseconds

  try {
    const receipt = await provider.waitForTransaction(
      transactionHash,
      confirms,
      timeout
    );
    const TXhistory = await AsyncStorage.getItem("TXhistory");
    const parseTXhistory = JSON.parse(TXhistory);
    let realTX = parseTXhistory[parseTXhistory.length - 1];

    let recents = await AsyncStorage.getItem("recents");
    let ParseRecents = JSON.parse(recents);
    ParseRecents.push({
      to: realTX.to,
      from: realTX.from,
      hash: realTX.hash,
    });

    await AsyncStorage.setItem("recents", JSON.stringify(ParseRecents));
    if (receipt.status === 1) {
      receiveNotify({
        title: "Sent Token (Success)",
        body: `You sent ${userData[0].symbol} to` + realTX.to,
        data: "https://etherscan.io/address/" + realTX.hash,
      });
      // Transaction succeeded
      realTX.status = "success";
      realTX.gasUsed = Number(receipt.gasUsed);
      realTX.gasPrice = Number(receipt.gasPrice);
      realTX.statusNo = receipt.status;
      realTX.blockNumber = Number(receipt.blockNumber);

      await AsyncStorage.setItem("TXhistory", JSON.stringify(parseTXhistory));

      userData[0].amount = await getBalance({
        rpcURL,
        address: dencryptUserWalletAddr,
      });
      await AsyncStorage.setItem("tokens", JSON.stringify(userData));
    } else if (receipt.status === 0) {
      receiveNotify({
        title: "Sent Token (Failed)",
        body: `You sent ${userData[0].symbol} to` + realTX.to,
        data: "https://etherscan.io/address/" + realTX.hash,
      });
      realTX.status = "failed";
      realTX.gasUsed = receipt.gasUsed;
      realTX.gasPrice = receipt.gasPrice;
      realTX.statusNo = receipt.status;
      realTX.blockNumber = receipt.blockNumber;
      console.error("Transaction failed:", receipt);
      // Transaction failed

      await AsyncStorage.setItem("TXhistory", JSON.stringify(parseTXhistory));
    } else {
      console.log("Transaction is still pending:", receipt);
      // Transaction is still pending
      setInterval(async () => {
        await confirmTX({
          transactionHash,
          network,
          userWalletAddress,
          contractAddress,
          provider,
        });
      }, 10000);
    }
  } catch (error) {
    console.error("Error waiting for transaction:", error);
    // then change to false
  }
};

function formatDateToCustomFormat() {
  const currentDate = new Date(Date.now());

  // Define arrays for month names and AM/PM labels
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const amPmLabels = ["AM", "PM"];

  // Extract date components
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = amPmLabels[hours < 12 ? 0 : 1]; // Determine AM or PM

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format the time with leading zeros
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the final formatted date and time string
  const formattedDate = `${month} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return formattedDate;
}

export const listenForEthAndERC20Transfer = async () => {
  try {
    const networks = await AsyncStorage.getItem("networks");
    const wallets = await AsyncStorage.getItem("wallets");
    const tokens = await AsyncStorage.getItem("tokens");
    const parseTokens = JSON.parse(tokens);

    const filterTokens = parseTokens.filter(
      (item) => item.address != "0x0000000000000000000000000000000000000000"
    );
    const parsenetworks = JSON.parse(networks);
    const parseWallets = JSON.parse(wallets);
    const walletArray = [];
    for (const parseWallet of parseWallets) {
      const decryptWalletAddress = await _decryotData({
        encryptedData: parseWallet.walletAddress,
      });
      walletArray.push(decryptWalletAddress.toLowerCase());
    }

    for (const network of parsenetworks) {
      let provider;
      try {
        console.log("unable to connect");
        provider = new ethers.JsonRpcProvider(network.rpcURL);
      } catch (error) {
        console.log("unable to connect");
      } // Set your provider

      if (
        network.id == "eth" ||
        network.id == "arbitrumGoerli" ||
        network.id == "sepolia" ||
        network.id == "polygonMumbai"
      ) {
        console.log("called something...........");
      } else {
        provider
          .on("block", async (blockNumber) => {
            // Get the block details
            const block = await provider.getBlock(blockNumber, true);
            // Check each transaction in the block
            for (const tx of block.prefetchedTransactions) {
              // If the transaction is to the user's address, log it and update the user's balance
              if (tx.to && walletArray.includes(tx.to.toLowerCase())) {
                console.log("calling.............");
                const date = formatDateToCustomFormat();
                let userData = parseTokens
                  .filter(
                    async (val) =>
                      (
                        await _decryotData({ encryptedData: val.walletAddress })
                      ).toLowerCase() == tx.to.toLowerCase()
                  )
                  .filter(
                    (val) =>
                      val.address ==
                      "0x0000000000000000000000000000000000000000"
                  )
                  .filter((val) => val.chainId == Number(tx.chainId));
                console.log(userData, "userData");
                let TXhistoryObj = {
                  userWalletAddress: tx.to,
                  network: userData[0].network,
                  contractAddress: "0x0000000000000000000000000000000000000000",
                  status: "success",
                  statusNo: 1,
                  symbol: userData[0].symbol,
                  date: date,
                  type: "Receive",
                  from: tx.from,
                  to: tx.to,
                  value: Number(tx.value),
                  gasUsed: Number(tx.gasUsed),
                  gasLimit: Number(tx.gasLimit),
                  gasPrice: Number(tx.gasPrice),
                  blockHash: tx.blockHash,
                  blockNumber: null,
                  timeStamp: "",
                  nonce: Number(tx.nonce),
                  hash: tx.hash,
                  chainId: Number(tx.chainId),
                };
                receiveNotify({
                  title: "Receive Token",
                  body: `You received Receive A Token from ${tx.from}`,
                  data: "https://etherscan.io/address/",
                });
                const TXhistory = await AsyncStorage.getItem("TXhistory");
                const parseTXhistory = JSON.parse(TXhistory);
                parseTXhistory.push(TXhistoryObj);
                await AsyncStorage.setItem(
                  "TXhistory",
                  JSON.stringify(parseTXhistory)
                );
                // Update the user's balance here
                console.log(userData, "before");
                userData[0].amount = await getBalance({
                  rpcURL: userData[0].rpcURL,
                  address: tx.to,
                });
                console.log(userData, "after");
                await AsyncStorage.setItem("tokens", JSON.stringify(userData));
              }
            }
          })
          .catch((err) =>
            console.log("Something went wrong connecting to provider")
          );
      }
    }

    if (filterTokens.length != 0) {
      for (const filterToken of filterTokens) {
        let provider;
        try {
          provider = new ethers.JsonRpcProvider(filterToken.rpcURL); // Set your provider
        } catch (error) {
          console.log("unable to connect");
        }
        let abi = await getContractAbi({
          contractAddress: "addr",
        });
        const contract = new ethers.Contract(
          filterToken.address,
          abi,
          provider
        );

        contract
          .on("Transfer", async (from, to, amount, event) => {
            console.log("calling..........");

            if (walletArray.includes(to.toLowerCase())) {
              let userData = parseTokens
                .filter(
                  async (val) =>
                    (
                      await _decryotData({
                        encryptedData: val.walletAddress,
                      })
                    ).toLowerCase() == filterToken.walletAddress.toLowerCase()
                )
                .filter((val) => val.address == filterToken.address)
                .filter((val) => val.chainId == filterToken.chainId);
              const date = formatDateToCustomFormat();

              console.log(userData, "userData");
              let TXhistoryObj = {
                userWalletAddress: to,
                network: userData[0].network,
                contractAddress: filterToken.address,
                status: "success",
                statusNo: 1,
                symbol: userData[0].symbol,
                date: date,
                type: "Receive",
                from: from,
                to: to,
                value: Number(amount),
                gasUsed: 0,
                gasLimit: 0,
                gasPrice: 0,
                blockHash: null,
                blockNumber: null,
                timeStamp: "",
                nonce: null,
                hash: null,
                chainId: Number(userData[0].chainId),
              };
              receiveNotify({
                title: "Receive Token",
                body: `You received Receive A Token from ${from}`,
                data: "https://etherscan.io/address/",
              });

              const TXhistory = await AsyncStorage.getItem("TXhistory");
              const parseTXhistory = JSON.parse(TXhistory);
              parseTXhistory.push(TXhistoryObj);

              await AsyncStorage.setItem(
                "TXhistory",
                JSON.stringify(parseTXhistory)
              );
              // Update the user's balance here
              userData[0].amount = await getBalance({
                rpcURL: userData[0].rpcURL,
                address: to,
              });
              await AsyncStorage.setItem("tokens", JSON.stringify(userData));
            }
          })
          .catch((err) => {
            console.log("something went wrong");
          });
      }
    }
  } catch (error) {
    console.log("An error occured");
    console.log(error);
  }
};

listenForEthAndERC20Transfer();

export const getSeedPhrase = async () => {
  const user = await AsyncStorage.getItem("user");
  const parseUser = JSON.parse(user);
  console.log(parseUser);

  const decryptedSeedPhrase = await _decryotData({
    encryptedData: parseUser.seedPrase,
  });

  return JSON.stringify(decryptedSeedPhrase);
};

export const _getAllTokens = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );

    // if (!response) return
    return response.data;
  } catch (error) {
    console.log("Something went wrong while trying to get tokens", error);
  }
};

export const onShare = async ({ activeWallet }) => {
  try {
    const result = await Share.share({
      message: activeWallet,
      title: "Wallet Address",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

function receiveNotify({ title, body, data }) {
  schedulePushNotification({
    title: title,
    body: body,
    data: data,
  });
}

////////////////////////////////////////
///////// CCIP HELPERS /////////////////
////////////////////////////////////////

export const getPrivateKey = async () => {
  const user = await _getActiveWallet();
  const parsedUser = JSON.parse(user);
  const decryptedPrivateKey = await _decryotData({
    encryptedData: parsedUser.privateKey,
  });

  return decryptedPrivateKey;
};

// Import necessary modules and data
import {
  getProviderRpcUrl,
  getRouterConfig,
  getMessageState,
} from "../constants/CCIPconfig/CCIPconfig.js";
import routerAbi from "../constants/abis/routerAbi.json";
import offRampAbi from "../constants/abis/offRampAbi.json";
import erc20Abi from "../constants/abis/erc20Abi.json";

export const checkIfTokenIsSupported = async ({
  sourceChain,
  tokenAddress,
  destinationChainSelector,
}) => {
  const sourceRouterAddress = getRouterConfig(sourceChain).address;

  const rpcUrl = getProviderRpcUrl(sourceChain);
  const privateKey = await getPrivateKey();
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  const sourceRouter = new ethers.Contract(
    sourceRouterAddress,
    routerAbi,
    signer
  );

  // Fetch the list of supported tokens
  const supportedTokens = await sourceRouter.getSupportedTokens(
    destinationChainSelector
  );

  let obj = {
    signer,
    supportedTokens,
  };

  if (supportedTokens.includes(tokenAddress)) {
    return { bool: true, ...obj, sourceRouter };
  } else {
    return { bool: false, ...obj, sourceRouter };
  }
};

export const getFeeToPay = async ({
  sourceChain,
  destinationChain,
  destinationAccount,
  tokenAddress,
  amount,
  feeTokenAddress,
}) => {
  const destinationChainSelector =
    getRouterConfig(destinationChain).chainSelector;

  const { bool, signer, supportedTokens, sourceRouter } =
    await checkIfTokenIsSupported({
      sourceChain,
      tokenAddress,
      destinationChainSelector,
    });

  if (bool == false) {
    throw Error(
      `Token address ${tokenAddress} not in the list of supportedTokens ${supportedTokens}`
    );
    return;
  }

  const tokenAmounts = [
    {
      token: tokenAddress,
      amount: amount,
    },
  ];

  const functionSelector = ethers.id("CCIP EVMExtraArgsV1").slice(0, 10);
  //  "extraArgs" is a structure that can be represented as [ 'uint256', 'bool' ]
  // extraArgs are { gasLimit: 0, strict: false }

  const abiCode = new ethers.AbiCoder();
  const extraArgs = abiCode.encode(["uint256", "bool"], [0, false]);
  const encodedExtraArgs = functionSelector + extraArgs.slice(2);

  const contractAddress = await _decryotData({
    encryptedData: destinationAccount,
  });

  console.log("constructing message", contractAddress);

  const message = {
    receiver: abiCode.encode(["address"], [contractAddress]),
    data: "0x", // no data
    tokenAmounts: tokenAmounts,
    feeToken: feeTokenAddress
      ? feeTokenAddress
      : "0x0000000000000000000000000000000000000000", // If fee token address is provided then fees must be paid in fee token.
    extraArgs: encodedExtraArgs,
  };

  const fees = await sourceRouter.getFee(destinationChainSelector, message);
  console.log(`Estimated fees (wei): ${fees}`);
  return fees;
};

export const approveSendToken = async ({
  tokenAddress,
  feeTokenAddress,
  sourceName,
  amount,
  message,
  fees,
}) => {
  const rpcURL = getProviderRpcUrl(sourceName);
  const sourceRouterAddress = getRouterConfig(sourceName).address;

  const provider = new ethers.JsonRpcProvider(rpcURL);
  const privateKey = await getPrivateKey();
  const signer = new ethers.Wallet(privateKey, provider);

  const erc20 = new ethers.Contract(tokenAddress, erc20Abi, signer);
  let sendTx, approvalTx;
  console.log(tokenAddress, feeTokenAddress, sourceName, amount, message, fees);

  if (!feeTokenAddress) {
    // Pay native
    // First approve the router to spend tokens
    approvalTx = await erc20.approve(sourceRouterAddress, amount);
    await approvalTx.wait(); // wait for the transaction to be mined
    console.log(
      `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
    );

    sendTx = await sourceRouter.ccipSend(destinationChainSelector, message, {
      value: fees,
    }); // fees are send as value since we are paying the fees in native
  } else {
    if (tokenAddress.toUpperCase() === feeTokenAddress.toUpperCase()) {
      // fee token is the same as the token to transfer
      // Amount tokens to approve are transfer amount + fees
      approvalTx = await erc20.approve(sourceRouterAddress, amount + fees);
      await approvalTx.wait(); // wait for the transaction to be mined
      console.log(
        `approved router ${sourceRouterAddress} to spend ${amount} and fees ${fees} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
      );
    } else {
      // fee token is different than the token to transfer
      // 2 approvals
      approvalTx = await erc20.approve(sourceRouterAddress, amount); // 1 approval for the tokens to transfer
      await approvalTx.wait(); // wait for the transaction to be mined
      console.log(
        `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
      );
      const erc20Fees = new ethers.Contract(feeTokenAddress, erc20Abi, signer);
      approvalTx = await erc20Fees.approve(sourceRouterAddress, fees); // 1 approval for the fees token
      await approvalTx.wait();
      console.log(
        `approved router ${sourceRouterAddress} to spend  fees ${fees} of token ${feeTokenAddress}. Transaction: ${approvalTx.hash}`
      );
    }
    sendTx = await sourceRouter.ccipSend(destinationChainSelector, message);
  }

  const receipt = await sendTx.wait(); // wait for the transaction to be mined
  console.log(receipt);

  // // Simulate a call to the router to fetch the messageID
  // const call = {
  //   from: sendTx.from,
  //   to: sendTx.to,
  //   data: sendTx.data,
  //   gasLimit: sendTx.gasLimit,
  //   gasPrice: sendTx.gasPrice,
  //   value: sendTx.value,
  // };

  // // Simulate a contract call with the transaction data at the block before the transaction
  // const messageId = await provider.call(call, receipt.blockNumber - 1);

  // console.log(
  //   `\n✅ ${amount} of Tokens(${tokenAddress}) Sent to account ${destinationAccount} on destination chain ${destinationChain} using CCIP. Transaction hash ${sendTx.hash} -  Message id is ${messageId}`
  // );

  // const walletActive = await _getActiveWallet();
  // const parseWallet = JSON.parse(walletActive);

  // const activeNetwork = await _getActiveNetwork();
  // let parseActiveNetwork = JSON.parse(activeNetwork);

  // const date = formatDateToCustomFormat();
  // let TXhistoryObj = {
  //   userWalletAddress: parseWallet.walletAddress,
  //   network: parseActiveNetwork.id,
  //   contractAddress,
  //   status: "pending",
  //   statusNo: null,
  //   symbol: symbol,
  //   date: date,
  //   type: "Send",
  //   from: tx.from,
  //   to: tx.to,
  //   value: amount,
  //   gasUsed: "",
  //   gasLimit: Number(tx.gasLimit),
  //   gasPrice: null,
  //   blockHash: tx.blockHash,
  //   blockNumber: null,
  //   timeStamp: "",
  //   nonce: Number(tx.nonce),
  //   hash: tx.hash,
  //   chainId: Number(tx.chainId),
  // };

  // const TXhistory = await AsyncStorage.getItem("TXhistory");
  // const parseTXhistory = JSON.parse(TXhistory);
  // parseTXhistory.push(TXhistoryObj);

  // await AsyncStorage.setItem("TXhistory", JSON.stringify(parseTXhistory));
  // navigation.navigate("transactions", { tokenName: "1INCH" });
};

export const checkStatusOfDestinationChain = async ({
  destinationChain,
  sourceChainSelector,
  messageId,
}) => {
  // Fetch status on destination chain
  const destinationRpcUrl = getProviderRpcUrl(destinationChain);

  // Initialize providers for interacting with the blockchains
  const destinationProvider = new ethers.JsonRpcProvider(destinationRpcUrl);
  const destinationRouterAddress = getRouterConfig(destinationChain).address;

  // Instantiate the router contract on the destination chain
  const destinationRouterContract = new ethers.Contract(
    destinationRouterAddress,
    routerAbi,
    destinationProvider
  );

  // CHECK DESTINATION CHAIN - POLL UNTIL the messageID is found or timeout

  const POLLING_INTERVAL = 60000; // Poll every 60 seconds
  const TIMEOUT = 40 * 60 * 1000; // 40 minutes in milliseconds

  let pollingId;
  let timeoutId;

  const pollStatus = async () => {
    // Fetch the OffRamp contract addresses on the destination chain
    const offRamps = await destinationRouterContract.getOffRamps();

    // Iterate through OffRamps to find the one linked to the source chain and check message status
    for (const offRamp of offRamps) {
      if (offRamp.sourceChainSelector.toString() === sourceChainSelector) {
        const offRampContract = new ethers.Contract(
          offRamp.offRamp,
          offRampAbi,
          destinationProvider
        );
        const events = await offRampContract.queryFilter(
          "ExecutionStateChanged"
        );

        // Check if an event with the specific messageId exists and log its status
        for (let event of events) {
          if (event.args && event.args.messageId === messageId) {
            const state = event.args.state;
            const status = getMessageState(state);
            console.log(
              `\n✅Status of message ${messageId} is ${status} - Check the explorer https://ccip.chain.link/msg/${messageId}`
            );

            // Clear the polling and the timeout
            clearInterval(pollingId);
            clearTimeout(timeoutId);
            return;
          }
        }
      }
    }
    // If no event found, the message has not yet been processed on the destination chain
    console.log(
      `Message ${messageId} has not been processed yet on the destination chain.Try again in 60sec - Check the explorer https://ccip.chain.link/msg/${messageId}`
    );
  };

  // Start polling
  console.log(
    `\nWait for message ${messageId} to be executed on the destination chain - Check the explorer https://ccip.chain.link/msg/${messageId}`
  );
  pollingId = setInterval(pollStatus, POLLING_INTERVAL);

  // Set timeout to stop polling after 40 minutes
  timeoutId = setTimeout(() => {
    console.log(
      "\nTimeout reached. Stopping polling - check again later (Run `get-status` script) Or check the explorer https://ccip.chain.link/msg/${messageId}"
    );
    clearInterval(pollingId);
  }, TIMEOUT);
};

export const refreshUserBalance = async () => {
  try {
    const tokenForthisNetwork = await _getTokens();
    const parseDatas = JSON.parse(tokenForthisNetwork);

    const allTokens = await AsyncStorage.getItem("tokens");
    const parseAllTokens = JSON.parse(allTokens);

    const address = await _decryotData({
      encryptedData: parseData.walletAddress,
    });

    for (const parseData of parseDatas) {
      parseData.amount = await getBalance({
        address: address,
        rpcURL: parseData.rpcURL,
      });
    }

    const filteredTokens = parseAllTokens.filter(
      (val) => val.walletAddress == parseDatas.walletAddress
    );
    let newArr = [...filteredTokens, ...parseDatas];
    console.log(newArr);
    // await AsyncStorage.setItem("tokens", newArr);
  } catch (err) {
    console.log(err);
  }
};
