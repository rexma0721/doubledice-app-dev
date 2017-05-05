// GraphQl
import {
  PreparedClaim,
  prepareVirtualFloorClaim,
  ResultUpdateAction,
  User as UserEntity,
  VirtualFloor as VirtualFloorEntity,
  VirtualFloorClaimType
} from "lib/graph"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import client from "config/apolloConfig"
import { USER_SPECIFIC_VIRTUAL_FLOOR } from "graphql/queries"

// Utils
import { BetState, handleSetBetState, isRunning } from "utils/betState"
import { getNetwork, OPERATOR_ROLE, showError } from "utils/helpers"
import persistData from "utils/persistData"
import Honeybadger from "@honeybadger-io/js"
import { useWeb3React } from "@web3-react/core"

// Types
import { Bet } from "utils/types"
import { claimPayouts, claimRefunds } from "web3Api/platformContract"
import BetCreatorChoosesResultButton from "./components/ChooseOption/BetCreatorChoosesResultButton"

// Components
import * as S from "./StyledComponents"
import * as SC from "./components/ChooseOption/shared/StyledComponents"
import * as SSC from "components/shared/StyledComponents"
import BetStateSteps from './components/Header/BetStateSteps'
import Analysis from "./components/Analysis"
import BetBy from './components/Header/BetBy'
import BettingBox from "./components/ChooseOption/BettingBox"
import ChallengeResultsBox from "./components/ChooseOption/ChallengeResultsBox"
import ReportButton from "./components/ReportButton"
import ShareButtons from "./components/ShareButtons"
import TimeRemaining from "./components/Header/TimeRemaining"
import UserConfirmsResultButton from "./components/UserConfirmsResultButton"
import ConfirmButton from './components/ConfirmButton'
import AdminChoosesResult from "./components/ChooseOption/AdminChoosesResult"
import AdminResolveZeroPool from "./components/AdminResolveZeroPool"
import CongratulationsEffect from 'components/shared/CongratulationsEffect'
import LinkToBetListButton from "./components/LinkToBetListButton"


import { injected } from "connectors"
import { colors } from "utils/colors"
import networkConfig from "config/networkConfig"
import assert from "assert"

interface PropsI {
  virtualFloor: VirtualFloorEntity;
}


const BetPageComponent = ({ virtualFloor }: PropsI) => {
  const { account, library, activate, active } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenBet, setChosenBet] = useState<Bet | null>(null);
  const [winningBet, setWinningBet] = useState<Bet | null>(null);
  const [userSpecificVirtualFloor, setUserSpecificVirtualFloor] =
    useState<VirtualFloorEntity | null>(null);
  const [data, setData] = useState<Bet[]>([]);

  // ToDo: Convert to `const [betState, setBetState] = useState<BetState | null>(null);` style
  const [betState, setBetState] = useState({ uiState: "", reason: "", status: "" });

  const [isClaimed, setIsClaimed] = useState<boolean>(false); // Todo: Find a proper way to refresh UI after claim
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false); // Todo: Find a proper way to refresh UI after claim

  const isAdmin = account && account.toLowerCase() == virtualFloor.owner.id;

  function handleSetWinningBet(newData: Bet[]) {
    if (virtualFloor.winningOutcome) {
      setWinningBet(newData[virtualFloor.winningOutcome.index]);
    } else setWinningBet(null);
  }

  // TODO: index should not be added in the front end
  // A color is added to each data array
  useEffect(() => {
    if (virtualFloor) {
      const newData = virtualFloor.outcomes.map((d, i) => {
        const colorIndex = i % 16;
        return { ...d, color: colors[colorIndex], index: d.index + 1 };
      });
      setBetState(handleSetBetState(virtualFloor));
      setData(newData);
      handleSetWinningBet(newData);
      const newBetStateInterval = setInterval(function () {
        setBetState(handleSetBetState(virtualFloor));
      }, 1000);

      return () => clearInterval(newBetStateInterval);
    }
  }, [virtualFloor]);

  useEffect(() => {
    (async () => {
      if (account && virtualFloor && virtualFloor.id) {
        const queryResult = await client.query<{
          virtualFloor: VirtualFloorEntity,
          user: UserEntity,
        }>({
          query: USER_SPECIFIC_VIRTUAL_FLOOR,
          variables: {
            vfId: virtualFloor.id,
            userId: account.toLowerCase(),
          },
        });
        setUserSpecificVirtualFloor(queryResult.data.virtualFloor);
        if (
          queryResult.data.user &&
          // Note: The OPERATOR is called "Admin" in the UI
          queryResult.data.user.roleUsers.some(({ role: { id } }) => id === OPERATOR_ROLE)
        ) {
          setIsUserAdmin(true);
        } else {
          setIsUserAdmin(false);
        }
      }
    })();
  }, [virtualFloor, account]);

  const claimPayoutsOrRefunds = async (claim: PreparedClaim): Promise<void> => {
    try {
      setIsLoading(true);
      const accountSigner = library.getSigner();
      const { claimType, tokenIds } = claim;

      let tx = null;

      if (claimType === VirtualFloorClaimType.Payouts) {
        tx = await claimPayouts(accountSigner, virtualFloor.id, tokenIds);
      } else {
        tx = await claimRefunds(accountSigner, virtualFloor.id, tokenIds);
      }
      if (tx) {
        persistData(
          'Challenge transaction waiting to be mined at',
          `${getNetwork(networkConfig.networkId).explorerLink}/tx/${tx.hash}`,
          tx.hash
        )
        await tx.wait()
        setIsClaimed(true);
        toast.success("Congratulations, you successfully claimed your reward");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Claiming bet failed with: ${error}`);
    }
  };

  const handleOnWallet = async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (error: any) {
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(error);
    }
  };

  let header;

  switch (betState.uiState) {
    case BetState.Active_Open:
      header = (
        <S.Header>
          <BetBy betClose={virtualFloor.tClose} />
          <TimeRemaining endTime={Number(virtualFloor.tClose)} />
        </S.Header>
      );
      break;
    case BetState.Active_Closed_ResolvableNever:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
          </S.Header>
          <S.HeaderTitle>
            <S.Title>{betState.reason}</S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableLater:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
            <TimeRemaining
              endTime={Number(virtualFloor.tResultSetMin)}
              format='second'
              title='Result due in'
            />
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={1} />
            <S.Title>{betState.reason}</S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult:

      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
            <TimeRemaining
              endTime={Number(virtualFloor.tResultSetMax)}
              format="second"
              title="Input result within"
            />
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={2} />
            <S.Title>
              {(!isAdmin || !account) &&
                `${betState.reason}`}
            </S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={2} resultInputFailed={true} />
            <S.Title>{betState.reason}</S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
            <TimeRemaining
              endTime={Number(virtualFloor.tResultChallengeMax)}
              format="second"
              title="Challenge time left"
            />
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={2} />
            <S.Title>{betState.reason}</S.Title>
            {winningBet && (
              <S.Description>{`The outcome is: ${winningBet.title}`}</S.Description>
            )}
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultChallenged:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={4} />
            <S.Title>{betState.reason}</S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult:
      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
            <S.Subtitle margin='0'>Bet Resolved</S.Subtitle>
          </S.Header>
          <S.HeaderTitle>
            <BetStateSteps step={4} isAdminInputFalse={true} />
            <S.Title>Let's see if you are a winner</S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Claimable: {
      // If virtualFloor.state has moved to a Claimable state,
      // but userSpecificVirtualFloor.state has not yet caught up because
      // HTTP response is still in transit,
      // prepareVirtualFloorClaim(userSpecificVirtualFloor) will return null.
      // So we cannot assert(claim), but we have to handle the possibility
      // of claim being null.
      const claim = userSpecificVirtualFloor
        ? prepareVirtualFloorClaim(userSpecificVirtualFloor)
        : null;

      const { status: betStateStatus } = betState;

      // ToDo: Once status is represented by an enum-type,
      // this assert can be dropped.
      assert(betStateStatus === 'Resolved' || betStateStatus === 'Cancelled');

      header = (
        <>
          <S.Header>
            <BetBy betClose={virtualFloor.tClose} isEnded={true} />
            <S.Subtitle margin='0'>Bet {betStateStatus}</S.Subtitle>
          </S.Header>
          {betStateStatus === 'Cancelled' && <S.Title>{betState.reason}</S.Title>}
          <S.HeaderTitle>
            {virtualFloor.resultUpdateAction ==
              ResultUpdateAction.CreatorSetResult ||
              (virtualFloor.resultUpdateAction ==
                ResultUpdateAction.SomeoneConfirmedUnchallengedResult && (
                  <BetStateSteps step={4} isAdminInputFalse={true} />
                ))}

            {virtualFloor.resultUpdateAction ==
              ResultUpdateAction.AdminFinalizedChallenge ||
              (virtualFloor.resultUpdateAction ==
                ResultUpdateAction.AdminFinalizedUnsetResult && (
                  <BetStateSteps
                    step={4}
                    resultInputFailed={true}
                    isAdminInputFalse={false}
                  />
                ))}
            {winningBet && winningBet.title && (
              <S.Subtitle>{`The outcome is: ${winningBet.title}`}</S.Subtitle>
            )}
            {!claim &&
              <SC.Container>
                <ConfirmButton
                  onClick={handleOnWallet}
                  title="Connect wallet"
                  isLoading={isLoading}
                  active={active}
                />
              </SC.Container>
            }
            {claim &&
              !isClaimed &&
              (() => {
                const { claimType, totalClaimAmount } = claim;
                const anythingToClaim = totalClaimAmount.gt(0);
                const claimDescription =
                  claimType === VirtualFloorClaimType.Payouts
                    ? "payout"
                    : "refund";
                return (
                  <>
                    {anythingToClaim
                      ? (
                        <SC.Container>
                          <ConfirmButton
                            onClick={() => claimPayoutsOrRefunds(claim)}
                            title={`You can claim a total ${claimDescription} of ${totalClaimAmount.toFixed(2)} ${virtualFloor.paymentToken.symbol}`}
                            isLoading={isLoading}
                            active={active}
                          />
                        </SC.Container>
                      )
                      : <LinkToBetListButton />
                    }
                    {(claim && !isClaimed && anythingToClaim) && <CongratulationsEffect />}

                  </>
                );
              })()}
          </S.HeaderTitle>
        </>
      );
      break;
    }
    default:
      header = <></>;
      break;
  }

  return (
    <SSC.Wrapper>
      <S.Main>
        {header}
        {betState.uiState ==
          BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult && (
            <ChallengeResultsBox
              virtualFloor={virtualFloor}
              setChosenBet={setChosenBet}
              chosenBet={chosenBet}
            />
          )}
        {betState.uiState ==
          BetState.Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult && (
            <BetCreatorChoosesResultButton
              chosenBet={chosenBet}
              setChosenBet={setChosenBet}
              virtualFloor={virtualFloor}
              betData={data}
            />
          )}
        {betState.uiState == BetState.Active_Closed_ResolvableNever && (
          <AdminResolveZeroPool virtualFloor={virtualFloor} />
        )}
        {betState.uiState ==
          BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult && (
            <UserConfirmsResultButton virtualFloor={virtualFloor} />
          )}
        {betState.uiState ==
          BetState.Active_Closed_ResolvableNow_ResultChallenged ||
          (betState.uiState ==
            BetState.Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult &&
            isUserAdmin && (
              <AdminChoosesResult
                chosenBet={chosenBet}
                setChosenBet={setChosenBet}
                virtualFloor={virtualFloor}
                betData={data}
                state={betState.uiState}
              />
            ))}
        <Analysis
          data={data}
          chosenBet={chosenBet}
          currency={virtualFloor.paymentToken.symbol}
          winningBet={winningBet}
        />
        {betState.uiState == BetState.Active_Open && (
          <BettingBox
            chosenBet={chosenBet}
            setChosenBet={setChosenBet}
            betData={data}
            isBetOpen={isRunning(virtualFloor)}
            virtualFloor={virtualFloor}
          />
        )}
      </S.Main>
      <S.Footer>
        <ShareButtons />
        <ReportButton virtualFloor={virtualFloor} />
      </S.Footer>
    </SSC.Wrapper>
  );
};

export default BetPageComponent;
