// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import type { NextPage } from "next";
import Image from "next/image"
// React
import { useEffect, useState } from "react";
// Utils
import { utcTime, hexToNumber, normalizeOrder } from "../../../utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im"
import { AiOutlineCheckCircle } from "react-icons/ai"
import getImageUrl from "../../../utils/getImageUrl";
import { NftSwap, NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import unfetch from 'isomorphic-unfetch';
// Components
import * as S from "./StyledComponents";

// GraphQL
import { NftItem } from '../../../lib/graph'
import Link from "next/link";
import { providers, Signer } from "ethers";
import { sign } from "crypto";
import { MdOutlineBatteryUnknown, MdOutlineVerifiedUser } from "react-icons/md";
import { TokenKind } from "graphql";
import networkConfig from "../../../config/networkConfig";
import { toast } from "react-toastify";

interface PropsI {
  NftItem: NftItem
}

const NFT = ({ NftItem }: PropsI): NextPage => {

    const { account, library, chainId, activate, active} = useWeb3React();

    const [walletAddress, setWalletAddress] = useState("");
    const [offerAmount, setOfferAmount] = useState(0);
    const [orders, setOrders] = useState([]);
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const networkId = networkConfig.networkId;
    const nftSwapSdk = new NftSwapV4( provider, signer, networkId)
    const address = account;

    useEffect(async()=> {
        if(provider !== null && signer !== null )
        {
          const temp = await nftSwapSdk.getOrders({
            nftToken: NftItem.tokenAddress,
            nftTokenId: NftItem.id,
            chainId: chainId,
          });

          setOrders([...temp.orders]);
        }
    }, []);

    const onOffer = async(NftItem) => {
      if (!library || !account) {
        toast.error("Please connect your wallet to make this transaction");
        return;
      }
      else {
        const swapNft = {
          tokenAddress: NftItem.contractAddress, // NftItem contract address
          tokenId: NftItem.id, // Token Id of the NftItem we want to swap
          type: 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
        };
        
        const orderPrice = {
          tokenAddress: NftItem.tokenAddress, // USDC contract address
          amount: offerAmount, // offer Amount
          type: 'ERC20',
        };
        
        const walletAddressUserA = address;
        
        const order = nftSwapSdk.buildNftAndErc20Order(
          swapNft,
          orderPrice,
          'buy',
          walletAddressUserA
        );

        const signedOrder = await nftSwapSdk.signOrder(order);
        await nftSwapSdk.postOrder(signedOrder, networkId);
      }
    }

    // when maker accept
    const onAccept = async(item, index) => {

        if (!library || !account) {
          toast.error("Please connect your wallet to make this transaction");
          return;
        }
        else {
          const orders = await nftSwap.getOrders({
            nftToken:  NftItem.tokenAddress,
            nftTokenId: NftItem.id,
            sellOrBuyNft: "buy", // Only show asks (sells) for this NFT (excludes asks)
          });
          
          const signedOrder = orders.orders[index].order;
    
          const fillTx = await nftSwapSdk.fillBuyNftOrderWithoutApproval(signedOrder, NftItem.id);
          const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
        }
    }

    // when maker cancel the trade
    const onRefuse = async(NftItem) => {
        if (!library || !account) {
          toast.error("Please connect your wallet to make this transaction");
          return;
        }
        else {
          const orders = await nftSwap.getOrders({
            nftToken:  NftItem.tokenAddress,
            nftTokenId: NftItem.id,
            sellOrBuyNft: "buy", // Only show asks (sells) for this NFT (excludes asks)
          });
          
          const signedOrder = orders.orders[index].order;
          await nftSwapSdk.cancelOrder(signedOrder);          
        }
    }
  
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
            <S.ListButton onClick = {() => onOffer(NftItem)}>Offer</S.ListButton>
            <S.PriceInput onChange={(e) => setOfferAmount(e.target.value)}></S.PriceInput>
          </S.Td>
          <S.Td>
            {
                NftItem.owner === address && 
                <S.orderDiv>
                    {orders.map((item, key) => {
                      <S.orderDiv>
                          <S.orderPrice>{item.erc20TokenAmount}</S.orderPrice>
                          <S.ListButton onClick = {() => onAccept(item, key)}>Accept</S.ListButton>
                          <S.ListButton onClick = {() => onRefuse(item, key)}>Refuse</S.ListButton>
                      </S.orderDiv>
                    })
                    }
              </S.orderDiv>
            }
          </S.Td>
        </S.Wrapper>
      </a>
  );


};

export default NFT;
