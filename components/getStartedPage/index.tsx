// Next
import Image from "next/image"
import Link from 'next/link'

// Components
import * as S from "./StyledComponents"

// Utils
import getImageUrl from "utils/getImageUrl"
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { toast } from "react-toastify"
import Honeybadger from "@honeybadger-io/js"

// Data
import tokens from 'utils/tokens'
import { showError } from "utils/helpers"


const GetStarted = () => {
  const { activate, active } = useWeb3React();

  const handleOnWallet = async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (error: any) {
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(error);
    }
  };

  return (
    <S.GettingStartedWrapper>
      <S.Title>Getting Started</S.Title>
      <S.SubTitle><S.Circle />Adding Polygon mainnet</S.SubTitle>
      <S.OrderedListWrapper>
        <S.List>Click on <S.Button onClick={handleOnWallet} isActive={active}>Connect wallet</S.Button></S.List>
        <S.List>Click the Approve button on Metamask to add polygon mainnet</S.List>
        <S.List>Click on the Switch Network button to switch your network to polygon mainnet</S.List>
      </S.OrderedListWrapper>
      <S.SubTitle><S.Circle />Buying Matic and our supported tokens</S.SubTitle>
      <S.OrderedListWrapper start={4}>
        <S.List>
          Visit <S.ATag href='https://ramp.network/buy/?defaultAsset=USDC' target='_blank'>Ramp</S.ATag> Or{' '}
          <S.ATag href='https://www.moonpay.com/buy' target='_blank'>MoonPay</S.ATag>
        </S.List>
        <S.List>
          Congratulations! You are now ready to bet. Checkout{' '}
          <Link href='/'>
            <a>
              <S.LinkWrapper>Live Bets</S.LinkWrapper>
            </a>
          </Link>
        </S.List>
      </S.OrderedListWrapper>
      <S.TokensTitle>Supported tokens</S.TokensTitle>
      <S.TokenWrapper>
        {
          tokens.map(token => (
            <S.TokenLink href={token.link} target='_blank'>
              <S.ImageWrapper isBackgroundWhite={token.name === 'ZRX' || token.name === 'OCEAN'}>
                <Image
                  layout="fixed"
                  objectFit="contain"
                  loading="lazy"
                  src={getImageUrl(token.imageSrc, false)}
                  alt={token.name}
                  width={30}
                  height={30}
                />
              </S.ImageWrapper>
              <S.TokenText>{token.name}</S.TokenText>
            </S.TokenLink>
          ))
        }
      </S.TokenWrapper>
    </S.GettingStartedWrapper>
  );
};

export default GetStarted;
