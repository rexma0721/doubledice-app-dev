import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setQuotaInfo } from "components/createBetPage/ducks";

// Components
import OptionBox from "./OptionBox";
import * as S from "./StyledComponents";
import { injected, walletconnect, walletlink } from "connectors";
import { useWeb3React } from "@web3-react/core";
import networkConfig from "config/networkConfig";
// @ts-ignore
import swal from "@sweetalert/with-react";


// Utils
import { toast } from "react-toastify";
import { getNetwork } from "utils/helpers";
import client from "config/apolloConfig";

interface PropsI {
  nextStep: () => void;
}

enum ConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
  WalletLink = "WalletLink",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
};

const ConnectWallet = ({ nextStep }: PropsI) => {
  const { account, active, chainId, activate } = useWeb3React();

  const createBetForm = useAppSelector((state) => state.createBetReducer);
  const dispatch = useAppDispatch();


  const quotaErrorMsg = () => {
    return swal(
      <div>
        <p>
          You do not seem to have an allowance for creating a bet with this
          wallet. Ensure you are using the correct wallet. If it is a mistake,
          please contact the site admin at{" "}
          <a href="mailto:info@doubledice.com" style={{ color: "blue" }}>
            info@doubledice.com
          </a>
          . If you would like to get an allowance,{" "}
          <a
            href="https://token.doubledice.com"
            style={{ color: "blue" }}
            target={"_blank"}
          >
            stake DODI
          </a>
          .
        </p>
      </div>
    );
  };



  useEffect(() => {
    (async () => {
      
      if (active && account && chainId === networkConfig.networkId) {
        if (createBetForm.quotaInfo.availableQuota) {
          nextStep();
        } else {
          quotaErrorMsg();
        }
      }
    })();
  }, [chainId, account, active]);

  const connectWallet = async (wallet: string) => {
    if (active && chainId !== networkConfig.networkId) {
      toast.warning(`Switch network to ${getNetwork(networkConfig.networkId).name}`);
      return;
    }
    if (active && account && chainId === networkConfig.networkId) {
      if (createBetForm.quotaInfo.availableQuota) {
        nextStep();
      } else {
        quotaErrorMsg();
        return;
      }
    }
    if (!active) {
      if (wallet === "metamask") {
        await activate(injected);
      }
      if (wallet === "walletconnect") {
        await activate(connectorsByName.WalletConnect);
      }
      if (wallet === "more") {
        await activate(connectorsByName.WalletLink);
      }
    }

    // @ts-ignore
    if (typeof window.ethereum == "undefined" || typeof window.web3 == "undefined") {
      toast.error("Please install Metamask wallet");
    }
  };

  return (
    <S.Container>
      <S.SubContainer>
        <OptionBox
          onClick={() => connectWallet("walletconnect")}
          imgSrc="/mock/walletConnect.png"
          title="Wallet Connect"
        />
        <OptionBox
          onClick={() => connectWallet("metamask")}
          imgSrc="/mock/metamask.png"
          title="MetaMask"
        />
        <OptionBox
          onClick={() => connectWallet("more")}
          imgSrc="/mock/trustwallet.png"
          title="More Wallets"
        />
      </S.SubContainer>
    </S.Container>
  );
};

export default ConnectWallet;
