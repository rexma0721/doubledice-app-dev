import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'

// Types
import { RoomEventInfo } from "lib/contracts"
import { PaymentToken } from 'lib/graph';
import { QuotaInfo } from 'utils/types';

interface LooseObject {
  [key: string]: string | string[] | number | any
}

export const initialQuota = {
  maxQuota: 0,
  availableQuota: 0,
  currentQuota: 0,
}

// Define a type for the slice state
interface CreateBetFormI {
  paymentToken: PaymentToken;
  categoryId: RoomEventInfo["category"];
  subcategorySubid: RoomEventInfo["subcategory"];
  title: string;
  description: string;
  opponents: RoomEventInfo["opponents"];
  resultSources: RoomEventInfo["resultSources"];
  isListed: true;
  outcomes: RoomEventInfo["outcomes"];
  multiplier: string;
  rake: string;
  minimumBet: string;
  maximumBet: string;
  startingPot: string;
  tOpen: number;
  tClose: number;
  tResolve: number;
  step: number;
  quotaInfo: QuotaInfo;
}

// Define the initial state using that type
const initialState: CreateBetFormI = {
  paymentToken: {
    name: "",
    address: "",
    decimals: 0,
    symbol: "",
    id: "",
    isTest: false,
    isWhitelisted: false
  },
  categoryId: "",
  subcategorySubid: "",
  title: "",
  description: "",
  opponents: [],
  resultSources: [],
  isListed: true,
  outcomes: [],
  multiplier: "",
  rake: "",
  minimumBet: "",
  maximumBet: "",
  startingPot: "",
  tOpen: 0,
  tClose: 0,
  tResolve: 0,
  step: 0,
  quotaInfo: initialQuota,
};

export const createBetReducer = createSlice({
  name: "createBet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<LooseObject>) => {
      return { ...state, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      return { ...state, step: action.payload };
    },
    setQuotaInfo: (state, action: PayloadAction<QuotaInfo>) => {
      return { ...state, quotaInfo: action.payload };
    },
    removeFormData: (state) => {
      return { ...initialState, step: state.step };
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      return { ...initialState, categoryId: action.payload };
    },
    removeStepsData: (state) => {
      return { ...state, step: 0 };
    },
    previousStep: (state) => {
      return { ...state, step: state.step - 1 };
    },
  },
});

export const { setFormData, removeFormData, removeStepsData, setStep, setQuotaInfo, previousStep, setCategoryId } = createBetReducer.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCreateBetForm = (state: RootState) => state.createBetReducer

export default createBetReducer.reducer