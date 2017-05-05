import React, { useLayoutEffect, useState } from 'react';

// Next
import Image from 'next/image'
import Link from 'next/link'

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from './StyledComponents'
import TimeZoneSwitcher from './components/TimeZoneSwitcher'
import Links from './components/Links'
import QuotaNumber from './components/QuotaNumber';
import ConnectWallet from './components/ConnectWallet';
import UseNetwork from 'components/shared/UseNetwork';


const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  useLayoutEffect(() => {    
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);    
  }, [])
  
  return (
    <S.NavbarContainer screenWidth={screenWidth}>
      <S.Main screenWidth={screenWidth}>
        <S.ImageContainer>
          <Link href="/">
            <a>
              <Image
                src={getImageUrl("/imgs/DDVFS.png", true)}
                alt="Logo"
                layout="fill"
                objectFit="contain"
                loading="lazy"
              />
            </a>
          </Link>
        </S.ImageContainer>
        <Links />
        {/* <TimeZoneSwitcher /> */}
        <QuotaNumber />
        <ConnectWallet />
        <UseNetwork />
      </S.Main>
    </S.NavbarContainer>
  );
}

export default Navbar