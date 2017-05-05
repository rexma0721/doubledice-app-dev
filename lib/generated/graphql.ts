import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  /** Deprecated in favour of `id`. */
  slug: Scalars['String'];
  subcategories: Array<Subcategory>;
  virtualFloors: Array<VirtualFloor>;
};

export type Opponent = {
  __typename?: 'Opponent';
  id: Scalars['ID'];
  image: Scalars['String'];
  title: Scalars['String'];
  virtualFloor: VirtualFloor;
};

export type Outcome = {
  __typename?: 'Outcome';
  id: Scalars['ID'];
  index: Scalars['Int'];
  outcomeTimeslots: Array<OutcomeTimeslot>;
  title: Scalars['String'];
  totalSupply: Scalars['BigDecimal'];
  totalWeightedSupply: Scalars['BigDecimal'];
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
  userOutcomes: Array<UserOutcome>;
  virtualFloor: VirtualFloor;
};

export type OutcomeTimeslot = {
  __typename?: 'OutcomeTimeslot';
  beta: Scalars['BigDecimal'];
  id: Scalars['ID'];
  outcome: Outcome;
  outcomeTimeslotTransfers: Array<OutcomeTimeslotTransfer>;
  timeslot: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  totalSupply: Scalars['BigDecimal'];
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
};

export type OutcomeTimeslotTransfer = {
  __typename?: 'OutcomeTimeslotTransfer';
  amount: Scalars['BigDecimal'];
  from: User;
  id: Scalars['ID'];
  outcomeTimeslot: OutcomeTimeslot;
  timestamp: Scalars['BigInt'];
  to: User;
};

export type PaymentToken = {
  __typename?: 'PaymentToken';
  address: Scalars['Bytes'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  isTest: Scalars['Boolean'];
  isWhitelisted: Scalars['Boolean'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type ResultSource = {
  __typename?: 'ResultSource';
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
  virtualFloor: VirtualFloor;
};

export enum ResultUpdateAction {
  AdminFinalizedChallenge = 'AdminFinalizedChallenge',
  AdminFinalizedUnsetResult = 'AdminFinalizedUnsetResult',
  CreatorSetResult = 'CreatorSetResult',
  SomeoneChallengedSetResult = 'SomeoneChallengedSetResult',
  SomeoneConfirmedUnchallengedResult = 'SomeoneConfirmedUnchallengedResult'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  roleUsers: Array<RoleUser>;
};

export type RoleUser = {
  __typename?: 'RoleUser';
  id: Scalars['ID'];
  role: Role;
  user: User;
};

export type Subcategory = {
  __typename?: 'Subcategory';
  category: Category;
  /**
   * Unique across all categories.
   * Currently formed by combining `subcategory.category.id + '/' + subcategory.subid`,
   * but this could change, so frontend code should treat this as an opaque string.
   */
  id: Scalars['ID'];
  /** Deprecated in favour of `subid`. */
  slug: Scalars['String'];
  /** Unique only within the parent category. */
  subid: Scalars['String'];
  virtualFloors: Array<VirtualFloor>;
};

export type User = {
  __typename?: 'User';
  challengedVirtualFloors: Array<VirtualFloor>;
  concurrentVirtualFloors: Scalars['BigInt'];
  createdVirtualFloors: Array<VirtualFloor>;
  id: Scalars['ID'];
  maxConcurrentVirtualFloors: Scalars['BigInt'];
  outcomeTimeslotTransfersFrom: Array<OutcomeTimeslotTransfer>;
  outcomeTimeslotTransfersTo: Array<OutcomeTimeslotTransfer>;
  /** Deprecated in favour of `createdVirtualFloors`. */
  ownedVirtualFloors: Array<VirtualFloor>;
  roleUsers: Array<RoleUser>;
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
  userOutcomes: Array<UserOutcome>;
  userVirtualFloors: Array<UserVirtualFloor>;
};

export type UserOutcome = {
  __typename?: 'UserOutcome';
  id: Scalars['ID'];
  outcome: Outcome;
  totalBalance: Scalars['BigDecimal'];
  totalWeightedBalance: Scalars['BigDecimal'];
  user: User;
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
  userVirtualFloor: UserVirtualFloor;
};

export type UserOutcomeTimeslot = {
  __typename?: 'UserOutcomeTimeslot';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  outcome: Outcome;
  outcomeTimeslot: OutcomeTimeslot;
  user: User;
  userOutcome: UserOutcome;
};

export type UserVirtualFloor = {
  __typename?: 'UserVirtualFloor';
  id: Scalars['ID'];
  totalBalance: Scalars['BigDecimal'];
  user: User;
  userOutcomes: Array<UserOutcome>;
  virtualFloor: VirtualFloor;
};

export type VirtualFloor = {
  __typename?: 'VirtualFloor';
  betaOpen: Scalars['BigDecimal'];
  bonusAmount: Scalars['BigDecimal'];
  category: Category;
  /** Only set if the result set by the creator has been challenged */
  challenger?: Maybe<User>;
  creationFeeRate: Scalars['BigDecimal'];
  creator: User;
  description: Scalars['String'];
  discordChannelId: Scalars['String'];
  flaggingReason?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  intId: Scalars['BigInt'];
  isListed: Scalars['Boolean'];
  isTest: Scalars['Boolean'];
  maxCommitmentAmount: Scalars['BigDecimal'];
  minCommitmentAmount: Scalars['BigDecimal'];
  opponents: Array<Opponent>;
  outcomes: Array<Outcome>;
  /** Deprecated in favour of `creator`. */
  owner: User;
  paymentToken: PaymentToken;
  platformFeeRate: Scalars['BigDecimal'];
  resultSources: Array<ResultSource>;
  resultUpdateAction?: Maybe<ResultUpdateAction>;
  state: VirtualFloorState;
  subcategory: Subcategory;
  tClose: Scalars['BigInt'];
  tCreated: Scalars['BigInt'];
  tOpen: Scalars['BigInt'];
  tResolve: Scalars['BigInt'];
  tResultChallengeMax?: Maybe<Scalars['BigInt']>;
  tResultSetMax: Scalars['BigInt'];
  tResultSetMin: Scalars['BigInt'];
  title: Scalars['String'];
  totalSupply: Scalars['BigDecimal'];
  userVirtualFloors: Array<UserVirtualFloor>;
  /** Total commitments to all outcomes + bonus amount - fees */
  winnerProfits?: Maybe<Scalars['BigDecimal']>;
  winningOutcome?: Maybe<Outcome>;
};

export enum VirtualFloorState {
  Active_ResultChallenged = 'Active_ResultChallenged',
  Active_ResultNone = 'Active_ResultNone',
  Active_ResultSet = 'Active_ResultSet',
  Claimable_Payouts = 'Claimable_Payouts',
  Claimable_Refunds_Flagged = 'Claimable_Refunds_Flagged',
  Claimable_Refunds_ResolvableNever = 'Claimable_Refunds_ResolvableNever',
  Claimable_Refunds_ResolvedNoWinners = 'Claimable_Refunds_ResolvedNoWinners'
}

/**
 * Holds totals in a singleton entity with special id 'singleton'.
 *
 * Like a database table with a single row.
 */
export type VirtualFloorsAggregate = {
  __typename?: 'VirtualFloorsAggregate';
  /** Should be always 'singleton' */
  id: Scalars['ID'];
  /** The total number of VFs ever created. */
  totalVirtualFloorsCreated: Scalars['Int'];
};
