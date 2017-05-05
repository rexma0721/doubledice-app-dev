import { useEffect, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setQuotaInfo } from "components/createBetPage/ducks";

// Components
import * as S from "./StyledComponents";

// Utils
import { useWeb3React } from "@web3-react/core";
import { connectorsByName, injected } from "connectors";
import { toast } from "react-toastify";
import { getNetwork, shortenAddress } from "utils/helpers";
import networkConfig from "config/networkConfig";
import Honeybadger from '@honeybadger-io/js'

export interface IConnectWalletProps {
  buttonWidth?: string;
  buttonHeight?: string;
  fontSize?: string;
}

const ConnectWallet = ({ buttonWidth, buttonHeight, fontSize }:IConnectWalletProps) => {
  const { active, account, chainId, activate } = useWeb3React();

  const connectWallet = async (wallet: string) => {
    try {
      if (active && chainId !== networkConfig.networkId) {
        toast.error(`Please switch to ${getNetwork(networkConfig.networkId).name}`);
        return;
      }
      if (wallet === "metamask") {
        await activate(injected);
      }
      if (wallet === "walletconnect") {
        await activate(connectorsByName.WalletConnect);
      }
      if (wallet === "more") {
        await activate(connectorsByName.WalletLink);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        Honeybadger.notify(`Connecting wallet failed with: ${error}`)
        toast.error(error?.message);
      }
    }
  };

  return (
    <S.ButtonWrapper buttonWidth={buttonWidth} buttonHeight={buttonHeight}>
      <S.ConfirmButton
        type="button"
        fontSize={fontSize}
        onClick={() => connectWallet("metamask")}
      >
        {account && chainId === networkConfig.networkId ? shortenAddress(account) : "Connect wallet"}
      </S.ConfirmButton>
    </S.ButtonWrapper>
  );
};

export default ConnectWallet;
