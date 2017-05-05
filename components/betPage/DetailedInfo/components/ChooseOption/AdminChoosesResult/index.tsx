import { useState, useEffect } from "react";

// Components
import * as S from "./StyledComponents"
import * as SC from "../shared/StyledComponents"
import BetOptions from "../shared/BetOptions";

// Utils
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { finalizeUnsetResult, finalizeChallenge } from "web3Api/platformContract";
import { toast } from "react-toastify"
import { Bet } from "utils/types"
import ConfirmButton from '../../ConfirmButton'
import { showError } from "utils/helpers"
import Honeybadger from '@honeybadger-io/js'
import { VirtualFloor } from "lib/graph";
import { BetState } from "utils/betState";

interface PropsI {
  chosenBet: Bet | null;
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>;
  betData: Bet[];
  virtualFloor: VirtualFloor;
  state: string;
}

const AdminChoosesResult = ({ chosenBet, setChosenBet, betData, virtualFloor, state }: PropsI) => {
  const { account, active, activate, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
   setChosenBet(null);
  }, [])
  

  const handleFinalizeResult = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select an outcome");
        return;
      }

      if (library) {
        const accountSigner = library.getSigner();

        const chosenIndex = chosenBet.index - 1;        
        
        setIsLoading(true);

        let setWinner;

        if (state == BetState.Active_Closed_ResolvableNow_ResultChallenged) {
          setWinner = await finalizeChallenge(
            accountSigner,
            chosenBet.virtualFloor.id,
            chosenIndex
          );
        }else if (state == BetState.Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult) {
          setWinner = await finalizeUnsetResult(
            accountSigner,
            chosenBet.virtualFloor.id,
            chosenIndex
          );
        }

        if (setWinner) {
          setIsLoading(false);
          toast.success("The bet winner has been set successfully");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Admin setting result failed with: ${error}`)
    }
  };

  let renderSection = <></>;

  if (!active) {
    renderSection = (
      <SC.Container>
        <ConfirmButton
          onClick={handleFinalizeResult}
          title="Confirm the winning option"
          isLoading={isLoading}
          active={active}
        />
      </SC.Container>
    );
  }else if (active) {
    renderSection = (
      <SC.Container>
        <S.Header>
          <SC.Title>
            Admin is logged in, please pick the outcome of the bet.
          </SC.Title>
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
            onClick={handleFinalizeResult}
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

export default AdminChoosesResult
