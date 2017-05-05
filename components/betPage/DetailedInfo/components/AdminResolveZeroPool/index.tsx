import { useState } from "react";

// Utils
import { useWeb3React } from "@web3-react/core";
import { injected } from "connectors";
import { cancelVirtualFloorUnresolvable } from "web3Api/platformContract";
import { VirtualFloor } from "lib/graph";
import { toast } from "react-toastify";
import ConfirmButton from "../ConfirmButton";
import { showError } from "utils/helpers";
import Honeybadger from "@honeybadger-io/js";

// Components
import * as SC from "../ChooseOption/shared/StyledComponents";

interface PropsI {
  virtualFloor: VirtualFloor;
}

const AdminResolveZeroPool = ({ virtualFloor }: PropsI) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { active, activate, library } = useWeb3React();

  const resolve = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        return;
      }
      if (library) {
        const accountSigner = library.getSigner();
        setIsLoading(true);

        const res = await cancelVirtualFloorUnresolvable(
          accountSigner,
          virtualFloor.id
        );

        if (res) {
          setIsLoading(false);
          toast.success("The bet have been resolved");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(`Admin resolving zero bet failed with: ${error}`);
    }
  };

  return (
    <SC.Container>
      <ConfirmButton
        onClick={resolve}
        title="Confirm bet as unresolvable"
        isLoading={isLoading}
        active={active}
      />
    </SC.Container>
  );
};

export default AdminResolveZeroPool;
