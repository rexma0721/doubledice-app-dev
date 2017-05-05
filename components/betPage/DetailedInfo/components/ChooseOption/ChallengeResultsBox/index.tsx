
// Components
import { useWeb3React } from "@web3-react/core"
import InfoModal from 'components/shared/infoModal'
import StepComponent from "components/shared/StepComponent"
import BetOptions from "../shared/BetOptions";

// GraphQL
import client from "config/apolloConfig"
import networkConfig from "config/networkConfig"
import { injected } from "connectors"
import { PAYMENT_TOKEN } from "graphql/queries"
import { VirtualFloor } from "lib/graph"
import { useEffect, useLayoutEffect, useState } from "react"

// Utils
import { toast } from "react-toastify"
import { BASE10, convertNumToBigInt, getNetwork, showError, SIX_DECIMAL } from "utils/helpers"
import persistData from "utils/persistData"
import { challengeSetResult } from "web3Api/platformContract"
import { getUserBalance, increaseAllowanceIfNecessary } from "web3Api/tokenContract"
import ConfirmButton from '../../ConfirmButton'
import * as S from "./StyledComponents"
import * as SC from "../shared/StyledComponents"
import Honeybadger from '@honeybadger-io/js'

// Types
import { Bet } from "utils/types";
import { colors } from "utils/colors";

const CHALLENGE_BOND_USD_AMOUNT = 100;

interface PropsI {
  virtualFloor: VirtualFloor;
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>;
  chosenBet: Bet | null;
}

const ChallengeResultsBox = ({ virtualFloor, chosenBet, setChosenBet }: PropsI) => {
  const { active, account, activate, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outcomeData, setOutcomeData] = useState<Bet[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setChosenBet(null);
  }, []);

  useEffect(() => {
    const data = []

    if (virtualFloor.winningOutcome) {
      for (let i = 0; i < virtualFloor.outcomes.length; i++) {
        const outcome = virtualFloor.outcomes[i];
        const colorIndex = i % 16;
        if (outcome.index !== virtualFloor.winningOutcome.index) {
          data.push({ ...outcome, color: colors[colorIndex], index: outcome.index + 1 });
        }
      }
      setOutcomeData(data);
    }
  }, [virtualFloor]);

  useLayoutEffect(() => {
    if (!active) {
      setStep(1);
    }
    if (active && chainId !== networkConfig.networkId) {
      setStep(2);
    }
  }, [active]);

  // ToDo: Read this directly from blockchain via `await DoubleDice__factory.connect(ADDRESS, signer).bondUsdErc20Token()`
  const getUSDAddress = async () => {
    const query = await client.query({
      query: PAYMENT_TOKEN,
    });
    const options = query.data.paymentTokens;
    let currencyAddress = "";
    for (let i = 0; i < options.length; i++) {
      const currency = options[i];
      if (currency?.symbol == "USDC") {
        currencyAddress = currency.address
      }
    }
    return currencyAddress;
  }

  const challenge = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        setStep(2);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select an outcome")
        return;
      }

      if (library && account) {
        const accountSigner = library.getSigner();
        const amount = convertNumToBigInt(BASE10, SIX_DECIMAL, CHALLENGE_BOND_USD_AMOUNT);

        const USDAddress = await getUSDAddress();

        const balance = await getUserBalance(accountSigner, USDAddress, account);

        if (amount.gt(balance)) {
          toast.error("Insufficient USDC balance");
          return;
        }
        setIsLoading(true)

        setStep(2);
 
        const checkAndApproveTx = await increaseAllowanceIfNecessary({
          signer: accountSigner,
          minAllowanceRequired: amount,
          tokenAddress: USDAddress,
        });

        if (checkAndApproveTx) {
          persistData(
            'Approval waiting to be mined at',
            `${getNetwork(networkConfig.networkId).explorerLink}/tx/${checkAndApproveTx.hash}`,
            checkAndApproveTx.hash
          );
          await checkAndApproveTx.wait();
        }

        setStep(3);
        const chosenIndex = chosenBet.index - 1;

        const tx = await challengeSetResult(
          accountSigner,
          virtualFloor.id,
          chosenIndex
        );

        if (tx) {
          persistData(
            'Challenge transaction waiting to be mined at',
            `${getNetwork(networkConfig.networkId).explorerLink}/tx/${tx.hash}`,
            tx.hash
          )
          await tx.wait();
          setStep(4);
          setIsLoading(false);
          toast.success("Challenge successful");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Challenging bet failed with: ${error}`)
    }
  };

  return (
    <SC.Container>
      <S.Header>
        <S.TitleWrapper>
          <S.Title>
            Select outcome
            <S.InfoIconWrapper>
              <InfoModal
                description="The bet creator has set the result.
               If you disagree with this result, please suggest the correct result below."
              />
            </S.InfoIconWrapper>
          </S.Title>
        </S.TitleWrapper>
        {account && (
          <SC.BetOptionsWrapper>
            <BetOptions
              chosenBet={chosenBet}
              setChosenBet={setChosenBet}
              betData={outcomeData}
            />
          </SC.BetOptionsWrapper>
        )}
      </S.Header>
      <SC.Main>
        <ConfirmButton
          onClick={challenge}
          disabled={isLoading}
          isLoading={isLoading}
          active={active}
          title="Challenge"
          info="Note: You need to deposit USD
          100 to challenge the result. If incorrectly challenged, you lose USD
          100. If correctly challenges, you receive back the USD 100."
        />
        <StepComponent step={step} title="Challenge" />
      </SC.Main>
    </SC.Container>
  );
};

export default ChallengeResultsBox;
