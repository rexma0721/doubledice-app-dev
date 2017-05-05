
// GraphQL
import { ApolloClient, useApolloClient } from "@apollo/client";
import { ALL_PUBLIC_VIRTUAL_FLOORS } from "graphql/queries";

import BetList from "components/layouts/BetListLayout/betList";
import { useEffect, useState } from "react";
import Honeybadger from "@honeybadger-io/js";
import { VirtualFloor } from "lib/graph";
import { useRouter } from "next/router";
import { isTestModeActivated } from "utils/helpers";


interface PropsI {
  numberOfItems: number
}

const BetListComponent = ({ numberOfItems }: PropsI) => {
  const includeTest = isTestModeActivated(useRouter().query);

  const client: ApolloClient<Object> = useApolloClient();

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [betList, setBetList] = useState<Array<VirtualFloor>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await client.query({
        query: ALL_PUBLIC_VIRTUAL_FLOORS,
        variables: {
          first: numberOfItems,
          skip: pageNumber === 0 ? 0 : numberOfItems * pageNumber, // Note: Same as `skip: 10 * pageNumber`
          includeTest,
        },
        fetchPolicy: "no-cache",
      });
      const betLength = data?.virtualFloors?.length;
      betLength && setBetList(betList.concat(data?.virtualFloors));
      setIsLoading(false);
      setHasMore(betLength < numberOfItems ? false : true);
      setPageNumber(pageNumber + 1);
    } catch (error: any) {
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

export default BetListComponent;
