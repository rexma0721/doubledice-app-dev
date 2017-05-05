import { useLayoutEffect, useState } from "react";

// Utils
import { VirtualFloor } from "lib/graph";

// Components
import * as S from "./StyledComponents";
import Bet from "components/layouts/BetListLayout/betList/Bet";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerDotted } from "spinners-react";
import { supernova } from "styles/colors";
import { AiOutlineArrowUp } from "react-icons/ai";

interface PropsI {
  betList: Array<VirtualFloor>;
  getMoreData: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const BetList = ({ betList, getMoreData, hasMore, isLoading }: PropsI) => {
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  const onscroll = ({ target }: any) => {
    setShowScrollButton(target.scrollTop === 0 ? false : true);
  };

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return (
    <S.Table id="bet-container">
      <S.Header>
        <S.Title>Event</S.Title>
        <S.Title></S.Title>
        <S.Title>Result Time</S.Title>
        <S.Title>Pool</S.Title>
        <S.Title textRight={true}>Status</S.Title>
      </S.Header>
      {isLoading ? (
        <S.SpinnerWrapper>
          <SpinnerDotted
            size={80}
            color={supernova}
            thickness={200}
            enabled={true}
          />
        </S.SpinnerWrapper>
      ) : (
        <>
          {betList?.length > 0 ? (
            <InfiniteScroll
              scrollableTarget="main-container"
              dataLength={betList?.length}
              next={getMoreData}
              hasMore={hasMore}
              onScroll={onscroll}
              loader={
                <S.SubSpinnerWrapper>
                  <SpinnerDotted
                    size={50}
                    color={supernova}
                    thickness={200}
                    enabled={true}
                  />
                </S.SubSpinnerWrapper>
              }
            >
              {betList.map(virtualFloor => (
                <Bet key={virtualFloor?.id} virtualFloor={virtualFloor} />
              ))}
              <S.ButtonContainer
                href="#bet-container"
                isScrollButtonVisible={showScrollButton}
                screenWidth={screenWidth}
              >
                <AiOutlineArrowUp size={20} color={"#000000"} />
              </S.ButtonContainer>
            </InfiniteScroll>
          ) : (
            <S.MessageWrapper>
              <S.Text>No bets</S.Text>
            </S.MessageWrapper>
          )}
        </>
      )}
    </S.Table>
  );
};

export default BetList;
