import { useState } from "react"

// Utils
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { confirmUnchallengedResult } from "web3Api/platformContract"
import { VirtualFloor } from "lib/graph"
import { toast } from "react-toastify"
import ConfirmButton from '../ConfirmButton'
import { getNetwork, showError } from "utils/helpers"
import persistData from "utils/persistData"
import Honeybadger from '@honeybadger-io/js'

// Components
import * as SC from "../ChooseOption/shared/StyledComponents"
import networkConfig from "config/networkConfig"

interface PropsI {
  virtualFloor: VirtualFloor
}

const UserConfirmsResultButton = ({ virtualFloor }: PropsI) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { active, activate, library } = useWeb3React();

  const agree = async (): Promise<void> => {
    try {

      if (!active) {
        await activate(injected);
        return;
      }
      if (library) {
        const accountSigner = library.getSigner();
        setIsLoading(true);

        const tx = await confirmUnchallengedResult(
          accountSigner,
          virtualFloor.id,
        );

        if (tx) {
          persistData(
            'Challenge transaction waiting to be mined at',
            `${getNetwork(networkConfig.networkId).explorerLink}/tx/${tx.hash}`,
            tx.hash
          )
          await tx.wait();
          setIsLoading(false);
          toast.success("The bet winner has been set successfully");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`User confirming bet failed with: ${error}`)
    }
  };

  return (
    <SC.Container>
      <ConfirmButton
        onClick={agree}
        title='Click here to check'
        isLoading={isLoading}
        active={active}
      />
    </SC.Container>
  );
};

export default UserConfirmsResultButton;
