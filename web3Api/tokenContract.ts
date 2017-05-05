import { TransactionResponse } from "@ethersproject/providers";
import networkConfig from "config/networkConfig";
import { BigNumber, ethers, Signer } from "ethers";
import { ERC20__factory } from "lib/contracts";

export const getAllowance = async (signer: Signer, tokenAddress: string): Promise<BigNumber> => {
  const tokenContract = ERC20__factory.connect(
    tokenAddress,
    signer
  );

  const account = await signer.getAddress();

  return await tokenContract
    .connect(signer)
    .allowance(account, networkConfig.platformContractAddress);
};

export const getUserBalance = async (signer: Signer, tokenAddress: string, user: string): Promise<BigNumber> => {
  const tokenContract = ERC20__factory.connect(
    tokenAddress,
    signer
  );

  return await tokenContract
    .connect(signer)
    .balanceOf(user);
};

// Originally we were calling increaseAllowance, however this is not a standard ERC-20 function,
// so we cannot assume that all whitelisted payment-tokens are going to have this function.
// In fact, WMATIC on Polygon mainnet does not: https://polygonscan.com/address/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270#code
export const increaseAllowanceIfNecessary = async ({
  signer,
  minAllowanceRequired,
  tokenAddress,
  spender = networkConfig.platformContractAddress
}: {
  signer: Signer;
  minAllowanceRequired: BigNumber;
  tokenAddress: string;
  spender?: string;
}): Promise<TransactionResponse | null> => {
  const currentAllowance = await getAllowance(signer, tokenAddress);
  const isCurrentAllowanceEnough = currentAllowance.gte(minAllowanceRequired);
  // If current allowance is enough to cover the required transaction,
  // we do nothing; but if the current allowance is not enough to cover the required transaction,
  // then we do not only ask for the required amount,
  // but we go all the way and target an "infinite" allowance
  if (!isCurrentAllowanceEnough) {
    const allowanceAmount = ethers.constants.MaxUint256;
    const tokenContract = ERC20__factory.connect(tokenAddress, signer);
    const tx = await tokenContract.connect(signer).approve(spender, allowanceAmount);
    return tx;
  }
  return null;
};
