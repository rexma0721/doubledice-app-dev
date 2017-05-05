import { useState, useLayoutEffect } from "react";

// Redux
import { useAppDispatch } from "hooks/reduxHooks";

// Utils
import networkConfig from "config/networkConfig";
import { IoMdLock } from "react-icons/io";

// GraphQL
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "@apollo/client";

// Components
import * as S from "./StyledComponents"
import { setQuotaInfo } from "components/createBetPage/ducks";
import { USER_QUOTA_INFO } from "graphql/queries";

const QuotaNumber = () => {
  const { account, chainId } = useWeb3React();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(USER_QUOTA_INFO, {
    variables: { id: account?.toLowerCase() },
    pollInterval: 1000
  });  

  const availableQuota = Number(data?.user?.maxConcurrentVirtualFloors) - Number(data?.user?.concurrentVirtualFloors) | 0;

  useLayoutEffect(() => {
    if (data && data.user) {
      dispatch(
        setQuotaInfo({
          maxQuota: Number(data?.user?.maxConcurrentVirtualFloors),
          availableQuota: availableQuota,
          currentQuota: Number(data?.user?.concurrentVirtualFloors),
        })
      );
    }
  }, [data]);
  

  


  return (
    <>
      <S.Wrapper
        onMouseOver={() => setIsModalOpen(true)}
        onMouseLeave={() => setIsModalOpen(false)}
        isLocked={!(account && chainId == networkConfig.networkId)}
      >
        {account && chainId == networkConfig.networkId ? (
          <>
            <S.Text>{availableQuota}</S.Text>
            {isModalOpen && (
              <S.ModalWrapper>
                <S.ModalMain>
                  {data?.user.availableQuota !== 0 ? (
                    <>
                      <S.ModalTitle>Bet/game hosting allowance: </S.ModalTitle>
                      <S.ModalText>
                        Max: {data?.user?.maxConcurrentVirtualFloors}
                      </S.ModalText>
                      <S.ModalText>
                        Active: {data?.user?.concurrentVirtualFloors}
                      </S.ModalText>
                      <S.ModalText>Available: {availableQuota}</S.ModalText>
                    </>
                  ) : (
                    <S.ModalLink href="https://token.doubledice.com">
                      Stake DODI to host your own bets/games and earn big
                    </S.ModalLink>
                  )}
                </S.ModalMain>
              </S.ModalWrapper>
            )}
          </>
        ) : (
          <>
            <IoMdLock size={20} color="white" />
            {isModalOpen && !account && (
              <S.ModalWrapper>
                <S.ModalMain>
                  <S.ModalText>
                    Please connect your wallet to see your quota
                  </S.ModalText>
                </S.ModalMain>
              </S.ModalWrapper>
            )}
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default QuotaNumber;
