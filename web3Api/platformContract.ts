import { TransactionResponse } from "@ethersproject/providers";
import networkConfig from "config/networkConfig";
import { BigNumber, Signer } from "ethers";
import { DoubleDice__factory, VirtualFloorCreationParamsStruct } from "lib/contracts";



export const commitToVirtualFloor = async (signer: Signer, amount: BigNumber, virtualFloorId: string, outcomeIndex: number, deadline: number): Promise<TransactionResponse  | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );
  
  const tx = await mainContract.commitToVirtualFloor(
    virtualFloorId,
    outcomeIndex,
    amount,
    deadline
  );

  if (tx) {
    return tx;
  }

  return null;
}

export const createVirtualFloor = async (signer: Signer, params: VirtualFloorCreationParamsStruct): Promise<TransactionResponse | null>=> {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.createVirtualFloor(params);

  if (tx) {
    return tx;
  }

  return null;
}

export const setResult = async (signer: Signer, virtualFloorId: string, winningOutcomeIndex: number): Promise<TransactionResponse | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.setResult(virtualFloorId, winningOutcomeIndex);

  if (tx) {
    return tx;
  }

  return null;
}

export const finalizeUnsetResult = async (signer: Signer, virtualFloorId: string, winningOutcomeIndex: number): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.finalizeUnsetResult(virtualFloorId, winningOutcomeIndex)

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const finalizeChallenge = async (signer: Signer, virtualFloorId: string, winningOutcomeIndex: number): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.finalizeChallenge(virtualFloorId, winningOutcomeIndex)

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const challengeSetResult = async (signer: Signer, virtualFloorId: string, outcomeIndex: number): Promise<TransactionResponse | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.challengeSetResult(virtualFloorId, outcomeIndex);

  if (tx) {
    return tx;
  }
  return null;
}

export const cancelVirtualFloorUnresolvable = async (signer: Signer, virtualFloorId: string): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.cancelVirtualFloorUnresolvable(virtualFloorId);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const confirmUnchallengedResult = async (signer: Signer, virtualFloorId: string): Promise<TransactionResponse | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.confirmUnchallengedResult(virtualFloorId);

  if (tx) {
    return tx;
  }

  return null;
}

export const claimRefunds = async (signer: Signer, virtualFloorId: string, tokenIds: BigNumber[]): Promise<TransactionResponse | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.claimRefunds(virtualFloorId, tokenIds);

  if (tx) {
    return tx;
  }

  return null;
}

export const claimPayouts = async (signer: Signer, virtualFloorId: string, tokenIds: BigNumber[]): Promise<TransactionResponse | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.claimPayouts(virtualFloorId, tokenIds);

  if (tx) {
    return tx;
  }

  return null;
}
