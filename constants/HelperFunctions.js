import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { encryptionKey } from "../constants/DATA";
import { ethers, Wallet, HDNodeWallet } from "ethers";
import axios from "axios";

let ETHERSCAN_API_KEY = "95GKUEVKANAKHD1J994RT2Z3415D4UI6ZY";

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
    return;
  }
  navigation.navigate(route);
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
          "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI",
        chainId: 1,
      },
      {
        name: "Sepolia Test Network",
        id: "sepolia",
        active: 0,
        color: "ff3a58",
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ydPFxm6YRyH0sTj5twpBzctDXXnpTejc",
        chainId: 11155111,
      },
      {
        name: "Smart Chain - Testnet",
        id: "bscTestNet",
        active: 0,
        color: "a769ec",
        rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chainId: 97,
      },
      {
        name: "Binance Smart Chain",
        id: "bsc",
        active: 0,
        color: "29d041",
        rpcURL: "https://bsc-dataseed.binance.org/",
        chainId: 56,
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
      },
      {
        name: "Smart Chain - Testnet",
        amount: Number(
          await getBalance({
            rpcURL: networks[2].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "bscTestNet",
        address: "0x0000000000000000000000000000000000000000",
        network: "bscTestNet",
        walletAddress: encryptedWalletAddress,
        chainId: 97,
      },
      {
        name: "Binance Smart Chain",
        amount: Number(
          await getBalance({
            rpcURL: networks[3].rpcURL,
            address: walletPhraseData.address,
          })
        ),
        symbol: "bsc",
        address: "0x0000000000000000000000000000000000000000",
        network: "bsc",
        walletAddress: encryptedWalletAddress,
        chainId: 56,
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
      console.log(privateKey, "This is the private key");
      let wallet = new ethers.Wallet(privateKey.toString());
      address = wallet.address;
      console.log(wallet, "Reached");

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

    const tokenArr = [
      {
        name: "Ethereum main Network",
        amount: Number(
          await getBalance({
            rpcURL:
              "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI",
            address: address,
          })
        ),
        symbol: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        network: "eth",
        walletAddress: encryptedWalletAddress,
        chaindId: 1,
        rpcURL:
          "https://eth-mainnet.g.alchemy.com/v2/XC3CF1s2-vjl609ZpkChVZywHbCzh-YI",
      },
      {
        name: "Sepolia Test Network",
        amount: Number(
          await getBalance({
            rpcURL:
              "https://eth-sepolia.g.alchemy.com/v2/ydPFxm6YRyH0sTj5twpBzctDXXnpTejc",
            address: address,
          })
        ),
        symbol: "sepolia",
        address: "0x0000000000000000000000000000000000000000",
        network: "sepolia",
        walletAddress: encryptedWalletAddress,
        chainId: 11155111,
        rpcURL:
          "https://eth-sepolia.g.alchemy.com/v2/ydPFxm6YRyH0sTj5twpBzctDXXnpTejc",
      },
      {
        name: "Smart Chain - Testnet",
        amount: Number(
          await getBalance({
            rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            address: address,
          })
        ),
        symbol: "bscTestNet",
        address: "0x0000000000000000000000000000000000000000",
        network: "bscTestNet",
        walletAddress: encryptedWalletAddress,
        chaindId: 97,
        rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
      {
        name: "Binance Smart Chain",
        amount: Number(
          await getBalance({
            rpcURL: "https://bsc-dataseed.binance.org/",
            address: address,
          })
        ),
        symbol: "bsc",
        address: "0x0000000000000000000000000000000000000000",
        network: "bsc",
        walletAddress: encryptedWalletAddress,
        chaindId: 56,
        rpcURL: "https://bsc-dataseed.binance.org/",
      },
    ];

    let newArr = [...parseTokens, ...tokenArr];

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

export const _getTokenDetail = async ({ addr }) => {
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
  const userTokenBalance = await contract.balanceOf(userWalletAddress);

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

  if (JSON.parse(tokens).find((val) => val.address == addr)) {
    console.log("lise");
    return setErr("Already Listed");
  }

  // let API_KEY = "3d24b57ebfb8442bb83583ed476e0133";

  const token = {
    name: name,
    amount: balance,
    symbol: symbol,
    address: addr,
    network: id,
    walletAddress: walletAddress,
    decimals: decimals,
    chaindId: parseActiveNetwork.chainId,
    rpcURL: parseActiveNetwork.rpcURL,
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

  console.log(parseData);
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
    console.log(
      "sending...................Eth",
      _recipient,
      parseActiveNetwork.rpcURL
    );

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
      value: Number(tx.value),
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
    console.log(ParseRecents);
    if (receipt.status === 1) {
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

const listenForEthAndERC20Transfer = async () => {
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

  for (const filterToken of filterTokens) {
    const provider = new ethers.JsonRpcProvider(filterToken.rpcURL); // Set your provider
    let abi = await getContractAbi({
      contractAddress: "addr",
    });
    const contract = new ethers.Contract(filterToken.address, abi, provider);

    contract.on("Transfer", (from, to, amount, event) => {
      console.log("calling..........");
      if (walletArray.includes(to.toLowerCase())) {
        console.log(`Transaction details: `, event);
        console.log(`Received transfer of ${amount} tokens from ${from}`);

        // provider.getTransaction(event.transactionHash).then((transaction) => {
        //   console.log(`Transaction details: `, transaction);
        // });
        // Update the user's balance here
      }
    });
  }

  for (const network of parsenetworks) {
    const provider = new ethers.JsonRpcProvider(network.rpcURL); // Set your provider

    provider.on("block", async (blockNumber) => {
      // Get the block details
      const block = await provider.getBlock(blockNumber, true);

      // Check each transaction in the block
      for (const tx of block.prefetchedTransactions) {
        // If the transaction is to the user's address, log it and update the user's balance
        if (tx.to && walletArray.includes(tx.to.toLowerCase())) {
          const date = formatDateToCustomFormat();

          console.log("calledddddddddddddddddddddddddddddd");

          let encryptedWalletAddress = await _encryotData({ data: tx.to });
          let userData = parseTokens
            .filter(
              async (val) =>
                (
                  await _decryotData({ encryptedData: val.walletAddress })
                ).toLowerCase() == tx.to.toLowerCase()
            )
            .filter(
              (val) =>
                val.address == "0x0000000000000000000000000000000000000000"
            )
            .filter((val) => val.chainId == Number(tx.chainId));
          console.log(userData, "userData");
          let TXhistoryObj = {
            userWalletAddress: tx.to,
            network: userData[0].network,
            contractAddress: "0x0000000000000000000000000000000000000000",
            status: "success",
            statusNo: null,
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

          const TXhistory = await AsyncStorage.getItem("TXhistory");
          const parseTXhistory = JSON.parse(TXhistory);
          parseTXhistory.push(TXhistoryObj);

          await AsyncStorage.setItem(
            "TXhistory",
            JSON.stringify(parseTXhistory)
          );

          console.log(`Transaction hash: ${tx.hash}`);
          console.log(`Transaction details: `, tx);

          // Update the user's balance here
          userData[0].amount = await getBalance({
            address: network.rpcURL,
            address: tx.to,
          });

          await AsyncStorage.setItem("tokens", JSON.stringify(userData));
        }
      }
    });
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
