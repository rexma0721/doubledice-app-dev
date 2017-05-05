import React, { useState } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// Components
import * as S from './StyledComponents';
import * as SC from 'components/shared/StyledComponents';
import Portal from 'components/shared/Portal';
// import VolleyBallIcon from 'public/imgs/VolleyballIcon'
// import FootballIcon from 'public/imgs/FootballIcon'
// import BaseballIcon from 'public/imgs/BaseballIcon'
// import ThreeDotsIcon from 'public/imgs/ThreeDots'

// Utils
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { useMediaQuery } from 'react-responsive';
import { boulder } from 'styles/colors';

// Data
import links from './links';


const NavbarLinks = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const isLaptopVerySmall = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <>
      {!isLaptopVerySmall &&
        <S.Main>
          <S.Container>
            {links.map((link, i) => (
              <Link href={link.url} key={link.title}>
                <a>
                  <S.LinkWrapper isActive={router.pathname === link.url}>
                    {/* {link.img &&
              <S.ImageContainer>
                {link.img}
              </S.ImageContainer>
            } */}
                    {link.title}
                  </S.LinkWrapper>
                </a>
              </Link>
            ))}
          </S.Container>
        </S.Main>
      }
      {isLaptopVerySmall &&
        <>
          <S.IconButton onClick={() => setIsModalOpen(true)}>
            <GiHamburgerMenu color='white' size={50} />
          </S.IconButton>
          {isModalOpen &&
            <Portal>
              <>
                <SC.Background onClick={() => setIsModalOpen(false)} />
                <S.Sidebar>
                  <S.SidebarTitle>Menu</S.SidebarTitle>
                  <S.CloseButton onClick={() => setIsModalOpen(false)} >
                    <IoMdClose size={30} color={boulder} />
                  </S.CloseButton>
                  <S.ResponsiveLinksWrapper>
                    {links.map((link, i) => (
                      <Link href={link.url}>
                        <a>
                          <S.ResponsiveLinkWrapper isActive={router.pathname === link.url}>
                            {link.title}
                            {router.pathname !== link.url && <IoIosArrowForward size={20} color={boulder} />}
                          </S.ResponsiveLinkWrapper>
                        </a>
                      </Link>
                    ))}
                  </S.ResponsiveLinksWrapper>
                </S.Sidebar>
              </>
            </Portal>
          }
        </>
      }
    </>
  );
};

export default NavbarLinks;
