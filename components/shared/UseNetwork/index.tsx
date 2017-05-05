import { useEffect } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useWeb3React } from "@web3-react/core";
import { PENDING_TRANSACTION } from "utils/persistData";

import { addNetwork } from "connectors";
import networkConfig from "config/networkConfig";
import { getNetwork } from "utils/helpers";
import Honeybadger from "@honeybadger-io/js";

const UseNetwork = () => {
  const { account, library, chainId } = useWeb3React();

  const toastData: ToastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
  };

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Internet connection restored", toastData);
    };

    const handleOffline = () => {
      toast.warn("Internet connection down", toastData);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const txnCheck = async (txnHash: string) => {
    let txn_test = await library.getTransaction(txnHash);
    if (txn_test && txn_test.blockNumber) {
      return true;
    }
    return false;
  };

  const tx: any = reactLocalStorage.getObject(PENDING_TRANSACTION);
  useEffect(() => {
    (async () => {
      if (library && tx && tx.txHash) {
        const isMined = await txnCheck(tx.txHash);

        if (isMined) {
          reactLocalStorage.remove(PENDING_TRANSACTION);
        } else {
          toast.info(tx.msg, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    })();
  }, [library]);

  useEffect(() => {
    (async () => {
      try {
        if (account && chainId !== networkConfig.networkId) {
          toast.info(
            `Please switch to ${getNetwork(networkConfig.networkId).name}`
          );
          await addNetwork(networkConfig.networkId);
        }
      } catch (error) {
        Honeybadger.notify(`Connecting wallet failed with: ${error}`);
      }
    })();
  }, [chainId]);

  return null;
};
export default UseNetwork;
