import { gql } from "@apollo/client";

const BET_LIST_COMMON_FIELDS = gql`
  fragment CommonFields on VirtualFloor {
    id
    subcategory {
      slug
      category {
        id
      }
    }
    title
    paymentToken {
      symbol
    }
    tResultSetMin
    state
    betaOpen
    tClose
    tResultSetMax
    tResultChallengeMax
    resultUpdateAction
    totalSupply
    resultUpdateAction
    outcomes {
      index
      totalSupply
      totalWeightedSupply
      title
    }
    opponents {
      id
      title
      image
    }
    owner {
      id
    }
    bonusAmount
  }
`;

// See https://doubledice.slack.com/archives/C03903Y2FPX/p1650388068604579 for discussion on state filter, totalSupply order
export const ALL_PUBLIC_VIRTUAL_FLOORS = gql`
  ${BET_LIST_COMMON_FIELDS}
  query AllVirtualFloors($skip: Int!, $first: Int!, $includeTest: Boolean!) {
    virtualFloors(
      first: $first,
      skip: $skip,
      where: {
        isListed: true,
        isTest_in: [false, $includeTest],
        state_in: [
          Active_ResultNone,
          Active_ResultSet,
          Active_ResultChallenged
        ]
      },
      orderBy: totalSupply,
      orderDirection: desc
    ) {
      ...CommonFields
    }
  }
`;

export const VIRTUAL_FLOOR_BETS = gql`
  query VirtualFloorBets($vfId: ID) {
    virtualFloors(where: { id: $vfId }) {
      paymentToken {
        symbol
      }
      outcomes {
        id
        index
        title
        outcomeTimeslots {
          outcomeTimeslotTransfers(
            where: { from: "0x0000000000000000000000000000000000000000" }
          ) {
            amount
            timestamp
            to {
              id
            }
            outcomeTimeslot {
              outcome {
                index
                title
              }
            }
          }
        }
      }
      bonusAmount
    }
  }
`;

export const USER_PLACED_VIRTUAL_FLOORS = gql`
  ${BET_LIST_COMMON_FIELDS}
  query PlacedVirtualFloors($skip: Int, $first: Int, $user: String) {
    user(id: $user) {
      id
      userOutcomes(
        first: $first
        skip: $skip
        orderDirection: desc
        where: { totalBalance_gt: 0 }
      ) {
        outcome {
          virtualFloor(orderBy: tCreated, orderDirection: desc) {
            ...CommonFields
          }
        }
      }
    }
  }
`;

export const USER_OWNED_VIRTUAL_FLOORS = gql`
  ${BET_LIST_COMMON_FIELDS}
  query OwnedVirtualFloors($skip: Int, $first: Int, $user: String) {
    users(where: { id: $user }) {
      ownedVirtualFloors(first: $first, skip: $skip, orderDirection: desc) {
        ...CommonFields
      }
    }
  }
`;

// ToDo: Use virtualFloor(id: $id) directly, and get the VF directly or get `null`
export const VIRTUAL_FLOORS = gql`
  query VirtualFloors($vfId: ID!) {
    virtualFloor(id: $vfId) {
      id
      subcategory {
        slug
        category {
          id
        }
      }
      title
      description
      isListed
      paymentToken {
        symbol
        decimals
        address
      }
      creationFeeRate
      platformFeeRate
      tCreated
      tOpen
      tClose
      tResultSetMin
      resultUpdateAction
      tResultSetMax
      tResultChallengeMax
      state
      discordChannelId
      bonusAmount
      minCommitmentAmount
      maxCommitmentAmount
      winningOutcome {
        id
        index
      }
      totalSupply
      betaOpen
      owner {
        id
      }
      opponents {
        id
        title
        image
      }
      outcomes {
        index
        totalSupply
        totalWeightedSupply
        title
        outcomeTimeslots {
          timeslot
          totalSupply
        }
        virtualFloor {
          id
          state
          tClose
          tResultSetMin
          tResultSetMax
          tResultChallengeMax
          tOpen
          betaOpen
          bonusAmount
          minCommitmentAmount
          maxCommitmentAmount
          paymentToken {
            symbol
            decimals
            address
          }
        }
      }
      resultSources {
        id
        title
        url
      }
    }
  }
`;

export const USER_SPECIFIC_VIRTUAL_FLOOR = gql`
  # See https://www.apollographql.com/docs/react/data/fragments/
  fragment CommonOutcomeFields on Outcome {
    index
    title
    totalSupply
    totalWeightedSupply
    userOutcomes(where: { user: $userId, totalBalance_gt: 0 }) {
      totalBalance
      totalWeightedBalance
      userOutcomeTimeslots(where: { balance_gt: 0 }) {
        balance
        outcomeTimeslot {
          beta
          timeslot
          tokenId
        }
      }
    }
  }

  query ($vfId: ID!, $userId: String) {
    virtualFloor(id: $vfId) {
      state
      outcomes {
        ...CommonOutcomeFields
      }
      winningOutcome {
        ...CommonOutcomeFields
      }
      winnerProfits
      bonusAmount
    }
    user(id: $userId) {
      roleUsers {
        role {
          id
        }
      }
    }
  }
`;

export const USER_QUOTA_INFO = gql`
  query GetQuota ($id: ID!) {
    user(id: $id) {
      id
      maxConcurrentVirtualFloors
      concurrentVirtualFloors
      ownedVirtualFloors {
        id
      }
    }
  }
`;

export const VIRTUALFLOOR_POOL_AMOUNT = gql`
  query VirtualFloors($id: String) {
    virtualFloors(where: { id: $id }) {
      id
      totalSupply
      bonusAmount
    }
  }
`;

export const PAYMENT_TOKEN = gql`
  query($includeTest: Boolean = false) {
    paymentTokens(where: {
      isWhitelisted: true,
      isTest_in: [false, $includeTest],
    }) {
      id
      address
      name
      symbol
      decimals
    }
  }
`;
