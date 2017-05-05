import { BigNumber as BigDecimal } from "bignumber.js";
import { BigNumber as BigInteger, BigNumberish, ethers } from "ethers";
import { decodeDoubleDiceCustomErrorData } from "lib/contracts";
import {
  VirtualFloorState as VirtualFloorEntityState
} from "lib/graph";
import moment from 'moment-timezone';
import slugify from "slugify";
import utf8 from "utf8";
import { NetworkResponse } from "./types";
import type { ParsedUrlQuery } from 'querystring';
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import networkConfig from "config/networkConfig";
import { USER_QUOTA_INFO } from "graphql/queries";
import client from "config/apolloConfig";

export const LINKS_PER_PAGE = 10;
export const UNSPECIFIED_ZERO = 0;
export const OPERATOR_ROLE = "OPERATOR_ROLE";

export const getQueryVariables = (isNewPage: number, page: number) => {
  const numPage = page - 1;
  const skip = isNewPage ? 0 : numPage * LINKS_PER_PAGE;
  const first = LINKS_PER_PAGE;
  return { first, skip };
};

export const BASE10 = 10;
export const SIX_DECIMAL = 6;
export const ZERO = BigInteger.from(0);

export const extractVfIdFromURL = (url: string, vfIdPosition: number): string => {
  const route = url.split("/");
  return toHexForGraphProtocol(route[vfIdPosition]);
}

export const sumNumbers = (values: number[]): number => {
  return values.reduce((a: number, b: number) => a + b, 0)
}

export const localTime = (format: string, time: number | string) => {
  return moment.unix(Number(time)).format(format);
}

export const checkUserQuota = async (connectedAccount: string) => {
  const query = await client.query({
    query: USER_QUOTA_INFO,
    variables: {
      id: connectedAccount.toLowerCase(),
    },
  });
  if (query.data && query.data.users[0]) {
    const quotaInfo = query.data.users[0];
    return {
      maxQuota: quotaInfo.maxConcurrentVirtualFloors,
      currentQuota: quotaInfo.concurrentVirtualFloors,
    };
  }
  return { maxQuota: "0", currentQuota: "0" };
};

export const decodeURIString = (value: string): string => {
  let utf8String = '';
  try {
    utf8String = utf8.decode(value)
  } catch (error) {
    utf8String = value
  }
  return utf8String;
}

export const slugifyUrl = (propName: string, propId: string): string => {
  const link = `${slugify(decodeURIString(propName), { replacement: '-', lower: true, remove: /[*+~.,()#^$_=%&`'"!:@/]/g })}`;
  return `${link}-${propId}`;
}

export const isValidURL = (str: string) => {
  const res = str.match(/((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi);
  return (res !== null)
};

export const maxInt = ethers.constants.MaxUint256;

export const validateAmountPrecision = (inputAmount: string, precision: number) => {
  let amount = inputAmount
  if (inputAmount.indexOf(".") > 0) {
    const amountArr = inputAmount.split(".");
    const currentPrecision = amountArr[1].length == 1 ? 1 : precision
    amount = `${amountArr[0]}.${amountArr[1].substring(0, currentPrecision)}`
  }
  return amount;
}

export const convertNumToHexdecimal = (num: string | number) => {
  return num.toString(16);
}

const isLocal = process.env.NETWORK_ID === '1337';

let timeAdjustment = 0;

if (isLocal) {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const refreshTimeAdjustment = async () => {
    try {
      // Note: This is the only way of "squeezing" this Ganache-internal value out of Ganache
      // See https://github.com/trufflesuite/ganache/blob/v7.0.0-alpha.0/src/chains/ethereum/ethereum/src/blockchain.ts#L713
      timeAdjustment = await provider.send('evm_increaseTime', [0]);
    } catch (e) {
      timeAdjustment = 0;
    }
    setTimeout(refreshTimeAdjustment, 1000);
  }
  refreshTimeAdjustment();
}

export const currentUnixTime = () => {
  return Math.floor((new Date().getTime()) / 1000) + timeAdjustment;
}

export const calculateBeta = (tOpen: number, tClose: number, betaOpen: string): number => {
  const t = Math.max(tOpen, Math.min(Math.floor(Date.now() / 1000), tClose))
  return 1 + ((tClose - t) * (Number(betaOpen) - 1)) / (tClose - tOpen)
}

export const canCommit = (state: VirtualFloorEntityState, tClose: string): boolean => {
  return state !== VirtualFloorEntityState.Active_ResultNone && currentUnixTime() > Number(tClose)
}

export const stringToColour = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export function getNetwork(netId: number): NetworkResponse {
  switch (netId) {
    case 1:
      return { name: "Ethereum mainnet", explorerName: "Etherscan", explorerLink: "https://etherscan.io", symbol: "ETH" };
    case 4:
      return { name: "Rinkeby Testnet", explorerName: "Etherscan", explorerLink: "https://rinkeby.etherscan.io", symbol: "ETH" };
    case 5:
      return { name: "Goerli Testnet", explorerName: "Etherscan", explorerLink: "https://goerli.etherscan.io", symbol: "ETH" };
    case 137:
      return { name: "Polygon mainnet", explorerName: "Polygonscan", explorerLink: "https://polygonscan.com", symbol: "MATIC" };
    case 80001:
      return { name: "Mumbai Testnet", explorerName: "Polygonscan", explorerLink: "https://mumbai.polygonscan.com", symbol: "MATIC" };
    default:
      return { name: "Unknown network", explorerName: "", explorerLink: "", symbol: "" };
  }
}

// Convert an id from a decimal to an 0x- prefixed hexadecimal without leading zeros, as expected by the Graph
// e.g. 1067328996096714362023906902016 => 0xd78b9da503dd3940000000000
export const toHexForGraphProtocol = (numeric: BigNumberish): string => {
  return BigInteger.from(numeric)
    .toHexString()
    .replace(/^0x0/, '0x') // Unlike ethers.js, Graph's toHex() drops leading 0, so we drop it too.
    .toLowerCase() // Graph's toHex() outputs lower-case. ethers.js does too, but we make it explicit.
}

export const hexToNumber = (zeroXHexTokenId: string): string => {
  return BigInt(zeroXHexTokenId).toString();
}

export const showError = (error: any): { shortMessage: string, longMessage: string } => {
  if (
    error.code
    && error.code === -32603
    && error.data
    && error.data.code
    && error.data.code === 3
    && error.data.message
    && typeof error.data.message === 'string'
    && error.data.data
    && typeof error.data.data === 'string'
    && /^0x/.test(error.data.data)
  ) {
    const message = error.data.message as string
    const data = error.data.data as string
    const decoded = decodeDoubleDiceCustomErrorData(data)
    if (decoded) {
      return {
        shortMessage: `${message}: ${decoded.name}`,
        longMessage: `${message}: ${decoded.name}(${decoded.formattedArgs})`,
      }
    } else {
      return {
        shortMessage: `${message}: ${data}`,
        longMessage: `${message}: ${data}`
      }
    }
  } else {
    // Original code
    let errorMsg = error.message;
    if (error.data) {
      errorMsg = error.data.message;
    }
    return {
      shortMessage: errorMsg,
      longMessage: errorMsg
    }
  }
}

export const convertNumToBigInt = (base: number, decimals: number, amount: string | number): BigInteger => {
  const bigDecimalAmount = new BigDecimal(base).pow(decimals).multipliedBy(amount);

  // We use toFixed instead of toString because we do not want exponential notation, e.g. 1e+21
  // bigDecimal amount should never have fractional part, because the input-component is already limiting the
  // decimal places according to the payment-token (e.g. max 6 decimals for USDC)
  // However, just in case, we pass toFixed(decimals=0) to ensure that intString is always without decimals.
  const intString = bigDecimalAmount.toFixed(0, BigDecimal.ROUND_DOWN);

  return BigInteger.from(intString);
}

export const polygonMainnet = 137;

export const polygonTestnet = 80001;

export const shortenAddress = (account: string) => {
  return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
}

export const isTestModeActivated = ({ test }: ParsedUrlQuery): boolean => {
  return !!test && typeof test === 'string' && (test === 'true' || test === 'yes' || test === '1');
}

// e.g. sum([1, 2, 3, 4]) => 10
export const sum = (values: number[]): number => values.reduce((a, b) => a + b)

export const DISCORD_CHANNEL_ID_NONE = 'none';
