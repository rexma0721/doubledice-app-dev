import { useState, useEffect } from "react";

// Components
import * as S from "./StyledComponents"
import * as SC from "../shared/StyledComponents"
import BetOptions from "../shared/BetOptions";

// Utils
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { setResult } from "web3Api/platformContract"
import { toast } from "react-toastify"
import { Bet } from "utils/types"
import ConfirmButton from '../../ConfirmButton'
import { getNetwork, showError } from "utils/helpers"
import persistData from "utils/persistData"
import Honeybadger from '@honeybadger-io/js'
import { VirtualFloor } from "lib/graph";
import networkConfig from "config/networkConfig";

interface PropsI {
  chosenBet: Bet | null;
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>;
  betData: Bet[];
  virtualFloor: VirtualFloor;
}

const BetCreatorChoosesResultButton = ({ chosenBet, setChosenBet, betData, virtualFloor }: PropsI) => {
  const { account, active, activate, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isCreator = account && account.toLowerCase() == virtualFloor.owner.id; 
  
  useEffect(() => {
   setChosenBet(null);
  }, [])
  

  const handleSetResult = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select an outcome");
        return;
      }

      if (library && account) {
        const accountSigner = library.getSigner();
        if (account.toLowerCase() !== virtualFloor.owner.id) {
          toast.error("You are not the bet creator");
          return;
        }

        const chosenIndex = chosenBet.index - 1;
        
        setIsLoading(true);
        const setWinner = await setResult(
          accountSigner,
          chosenBet.virtualFloor.id,
          chosenIndex
        );

        if (setWinner) {
          persistData(
            'Setting result transaction waiting to be mined at',
            `${getNetwork(networkConfig.networkId).explorerLink}/tx/${setWinner.hash}`,
            setWinner.hash
          )
          await setWinner.wait();
          setIsLoading(false);
          toast.success("The bet winner has been set successfully");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Bet creator setting result failed with: ${error}`)
    }
  };

  let renderSection = <></>;

  if (!active) {
    renderSection = (
      <SC.Container>
        <ConfirmButton
          onClick={handleSetResult}
          title="Confirm the winning option"
          isLoading={isLoading}
          active={active}
        />
      </SC.Container>
    );
  }else if (active && isCreator) {
    renderSection = (
      <SC.Container>
        <S.Header>
          <SC.Title>Please pick the outcome of the bet.</SC.Title>
        </S.Header>
        <SC.Main>
          <S.SelectOptionWrapper>
            <SC.BetOptionsWrapper>
              <BetOptions
                chosenBet={chosenBet}
                setChosenBet={setChosenBet}
                betData={betData}
              />
            </SC.BetOptionsWrapper>
          </S.SelectOptionWrapper>

          <ConfirmButton
            onClick={handleSetResult}
            title="Confirm the winning option"
            isLoading={isLoading}
            active={active}
          />
        </SC.Main>
      </SC.Container>
    );
  }

  return renderSection;
};

export default BetCreatorChoosesResultButton
