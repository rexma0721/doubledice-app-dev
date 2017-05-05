// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import type { NextPage } from "next";
import Image from "next/image"

// Utils
import { utcTime, hexToNumber } from "utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im"
import { AiOutlineCheckCircle } from "react-icons/ai"
import getImageUrl from "../../../utils/getImageUrl";
import { NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import networkConfig from "../../../config/networkConfig";
// Components
import * as S from "./StyledComponents";

// GraphQL
import { NftItem } from "lib/graph";
import Link from "next/link";
import { providers, Signer } from "ethers";
import { sign } from "crypto";
import { toast } from "react-toastify";
// React
import React from 'react'

interface PropsI {
  NftItem: NftItem
}

const NFT = ({ NftItem }: PropsI): NextPage => {

  const { account, library, chainId} = useWeb3React();
  const [offerAmount, setOfferAmount] = React.useState(0);

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  const networkId = networkConfig.networkId;
  const nftSwapSdk = new NftSwapV4( provider, signer, networkId);

  const setList = async() => {
    if (!library || !account) {
      toast.error("Please connect your wallet to make this transaction");
      return;
    }
    else {
        const swapNft = {
          tokenAddress: NftItem.contractAddress, // CryptoPunk contract address
          tokenId: NftItem.id, // Token Id of the CryptoPunk we want to swap
          type: 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
        };
        
        await nftSwapSdk.approveTokenOrNftByAsset(swapNft, NftItem.owner);
    
        const orderPrice = {
          tokenAddress: NftItem.tokenAddress, // USDC contract address
          amount: offerAmount, // offer Amount
          type: 'ERC20',
        };
        
        const walletAddressUserA = account;
        
        const order = nftSwapSdk.buildNftAndErc20Order(
          swapNft,
          orderPrice,
          'sell',
          walletAddressUserA
        );
    
        const signedOrder = await nftSwapSdk.signOrder(order);
        await nftSwapSdk.postOrder(signedOrder, chainId);  
    }
  };

  return (
      <a>
        <S.Wrapper>
          <S.Td>
            <S.Title>{NftItem.title}</S.Title>
            <S.CategoryText>
              {NftItem.description}
            </S.CategoryText>
          </S.Td>
          <S.Td>
            {/* <S.imagesWrapper>
                <S.ImageWrapper>
                  <Image
                    layout="fixed"
                    objectFit="cover"
                    loading="lazy"
                    src={NftItem.image}
                    width={50}
                    height={50}
                  />
                </S.ImageWrapper>
            </S.imagesWrapper> */}
          </S.Td>
          <S.Td>
            <S.Title>
              {NftItem.price}
            </S.Title>
            <S.SubTitle>
              {NftItem.token}
            </S.SubTitle>
          </S.Td>
          <S.Td>
            <S.ListButton onClick = {() => setList(NftItem)}>List</S.ListButton>
          </S.Td>
        </S.Wrapper>
      </a>
  );
};

export default NFT;
