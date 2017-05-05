import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ApolloClient, useApolloClient } from "@apollo/client";

// Components
import { USER_PLACED_VIRTUAL_FLOORS } from "graphql/queries";
import BetList from "components/layouts/BetListLayout/betList";
import * as S from "./StyledComponents";
import { VirtualFloor } from "lib/graph";
import ConnectWallet from "components/layouts/shared/Navbar/components/ConnectWallet";
import Honeybadger from "@honeybadger-io/js";


interface PropsI {
  numberOfItems: number
}

interface IOutCome {
  virtualFloor: VirtualFloor;
}

interface IBetsPlaced {
  outcome: IOutCome;
}

const BetsPlacedPage = ({ numberOfItems }: PropsI) => {
  const { account } = useWeb3React();
  const client: ApolloClient<Object> = useApolloClient();

  if (!account) {
    return (
      <S.ButtonWrapper>
        <ConnectWallet buttonWidth={"40rem"} buttonHeight={"6rem"} fontSize={"1.7rem"} />
      </S.ButtonWrapper>
    );
  }

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [betList, setBetList] = useState<Array<VirtualFloor>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setStates();
    getData();
  }, [account]);

  const setStates = () => {
    setBetList([]);
    setPageNumber(1);
    setIsLoading(true);
  };

  const getData = async () => {
    try {
      const { data } = await client.query({
        query: USER_PLACED_VIRTUAL_FLOORS,
        variables: {
          first: numberOfItems,
          skip: pageNumber === 0 ? 0 : numberOfItems * pageNumber,
          user: account.toLowerCase(),
        },
        fetchPolicy: "no-cache",
      });

      const betData =
        data?.user?.userOutcomes.map(
          (bet: IBetsPlaced) => bet?.outcome?.virtualFloor
        ) || [];

      setIsLoading(false);
      betData.length && setBetList(betList.concat(betData));
      setHasMore(data?.user?.userOutcomes.length < numberOfItems ? false : true);
      setPageNumber(pageNumber + 1);
    } catch (error) {
      Honeybadger.notify(`Fetching user's placed bet failed with: ${error}`);
    }
  };

  return (
    <BetList
      betList={betList}
      getMoreData={getData}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};

export default BetsPlacedPage;
