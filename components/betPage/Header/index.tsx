// Next
import { Opponent } from "lib/graph";
import Image from "next/image";

// Utils
import getImageUrl from "utils/getImageUrl";
import { imagePlaceholder } from "utils/imagesPlaceholder";

// Components
import * as S from "./StyledComponents";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// install Swiper modules
SwiperCore.use([Navigation]);
interface PropsI {
  title: string;
  description: string;
  opponents: Opponent[];
}

const Header = ({ title, opponents, description }: PropsI) => {
  return (
    <S.Container>
      <S.BackgroundImageContainer>
        <Image
          src={getImageUrl("/mock/gameBackground.png", true)}
          alt="background"
          layout="fill"
          objectFit="contain"
          loading="lazy"
        />
      </S.BackgroundImageContainer>
      <S.Header>
        <S.HeaderText>{title}</S.HeaderText>
        <S.DescriptionText>{description}</S.DescriptionText>
      </S.Header>
      <S.Main id='bet-page-header-opponents-image'>
        {opponents.length === 1 && (
          <S.SingleImagesContainer>
            <S.ImageContainer>
              <S.ImageWrapper>
                <Image
                  layout="fixed"
                  objectFit="contain"
                  loading="lazy"
                  src={getImageUrl(opponents[0].image)}
                  alt={opponents[0].title}
                  width={122}
                  height={122}
                />
              </S.ImageWrapper>
              <S.ImageText maxWidth={"14rem"}>{opponents[0].title}</S.ImageText>
            </S.ImageContainer>
          </S.SingleImagesContainer>
        )}

        {opponents.length === 2 && (
          <S.ImagesContainer>
            <S.ImageContainer>
              <S.ImageWrapper>
                <Image
                  layout="fixed"
                  objectFit="contain"
                  loading="lazy"
                  src={getImageUrl(opponents[0].image)}
                  alt={opponents[0].title}
                  width={122}
                  height={122}
                />
              </S.ImageWrapper>
              <S.ImageText maxWidth={"14rem"}>{opponents[0].title}</S.ImageText>
            </S.ImageContainer>
            <S.Text>VS</S.Text>
            <S.ImageContainer>
              <S.ImageWrapper>
                <Image
                  layout="fixed"
                  objectFit="contain"
                  loading="lazy"
                  src={getImageUrl(opponents[1].image)}
                  alt={opponents[1].title}
                  width={122}
                  height={122}
                />
              </S.ImageWrapper>
              <S.ImageText maxWidth={"14rem"}>{opponents[1].title}</S.ImageText>
            </S.ImageContainer>
          </S.ImagesContainer>
        )}

        {opponents.length > 2 && (
          <Swiper
            navigation={true}
            centerInsufficientSlides={true}
            spaceBetween={10}
            style={{ width: "100%" }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              901: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            <S.MultipleImagesContainer>
              {opponents.map((opponent) => (
                <SwiperSlide key={opponent.title}>
                  <S.ImageContainer>
                    <S.ImageWrapper>
                      <Image
                        layout="fixed"
                        objectFit="contain"
                        loading="lazy"
                        src={getImageUrl(opponent.image)}
                        alt={opponent.title}
                        width={110}
                        height={110}
                        placeholder="blur"
                        blurDataURL={imagePlaceholder}
                      />
                    </S.ImageWrapper>
                    <S.ImageText maxWidth={"11rem"}>
                      {opponent.title}
                    </S.ImageText>
                  </S.ImageContainer>
                </SwiperSlide>
              ))}
            </S.MultipleImagesContainer>
          </Swiper>
        )}
      </S.Main>
    </S.Container>
  );
};

export default Header;
