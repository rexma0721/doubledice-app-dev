// @ts-nocheck
// Above is for until when the data given here is not coming from backend
import { MouseEvent, ReactElement, useLayoutEffect, useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Utils
import { handleSetBetState } from "utils/betState";
import { getKnownCategoryTitle, getKnownSubcategoryTitle } from "utils/categories";
import { localTime, hexToNumber } from "utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import getImageUrl from "utils/getImageUrl";
import { useMediaQuery } from "react-responsive";
import { usePopper } from "react-popper";

// Components
import * as S from "./StyledComponents";
import ECGIcon from "public/icons/ECGIcon";
import * as SC from "components/shared/infoModal/StyledComponents";

// GraphQL
import { Opponent, VirtualFloor } from "lib/graph";
import assert from "assert";

interface PropsI {
  virtualFloor: VirtualFloor;
}

const Bet = ({ virtualFloor }: PropsI): ReactElement => {
  const [status, setStatus] = useState<string | null>(null);
  const [opponents, setOpponents] = useState<Opponent[] | null>(null);
  const isLaptopSmall = useMediaQuery({ query: "(max-width: 1200px)" });
  const isLaptopVerySmall = useMediaQuery({ query: "(max-width: 1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  const router = useRouter()

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });

  const handleOnMouseOver = (e: MouseEvent) => {
    e.stopPropagation()
    setIsShowModal(true)
  }

  const handleOnMouseLeave = (e: MouseEvent) => {
    e.stopPropagation()
    setIsShowModal(false)
  }

  useLayoutEffect(() => {
    if (virtualFloor.id) {
      let theStatus = "";
      if (handleSetBetState(virtualFloor).status) {
        switch (handleSetBetState(virtualFloor).status) {
          case "Open":
            theStatus = <ECGIcon />;
            break;
          case "Closed":
          case "Cancelled":
          case "Resolved":
            theStatus = <AiOutlineCheckCircle color={supernova} />;
            break;
          case "Unresolved":
            theStatus = <ImHammer2 color={supernova} />;
            break;
          default:
            theStatus = <ECGIcon />;
            break;
        }
      }
      setStatus(theStatus);
    }
  }, [virtualFloor.id]);

  useLayoutEffect(() => {
    if (virtualFloor.id) {
      let numberOfImages = 5;
      if (isLaptopVerySmall) numberOfImages = 3;
      else if (isLaptopSmall) numberOfImages = 4;

      const newOpponents = virtualFloor.opponents.filter(
        (opponent, i) => i < numberOfImages
      );
      setOpponents(newOpponents);
    }
  }, [virtualFloor.id, isLaptopSmall, isLaptopVerySmall])

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])
  
  assert(virtualFloor.subcategory);
  assert(virtualFloor.subcategory.slug);
  assert(virtualFloor.subcategory.category && virtualFloor.subcategory.category.id);
  const categoryId = virtualFloor.subcategory.category.id;
  const subcategorySubid = virtualFloor.subcategory.slug;

  // ToDo: For now we simply display the id itself as the title if the category is unknown,
  // but this could be avoided if we query exclusively for VFs with a known categoryId.
  const categoryTitle = getKnownCategoryTitle(categoryId) || categoryId;
  const subcategoryTitle = getKnownSubcategoryTitle(categoryId, subcategorySubid) || subcategorySubid;

  const renderBetList = (
    <S.Wrapper onClick={() => isMobile && router.push(`/bet/#!/${hexToNumber(virtualFloor.id)}`)}>
      <S.Td>
        <S.Title>{virtualFloor.title}</S.Title>
        <S.CategoryText>{categoryTitle}</S.CategoryText>
      </S.Td>
      <S.Td>
        <S.imagesWrapper>
          {opponents?.length > 0 &&
            opponents.map(opponent => (
              <S.ImageWrapper>
                <Image
                  layout="fixed"
                  objectFit="cover"
                  loading="lazy"
                  src={getImageUrl(opponent.image)}
                  width={50}
                  height={50}
                />
              </S.ImageWrapper>
            ))}
        </S.imagesWrapper>
      </S.Td>
      <S.Td>
        <S.Title>
          {localTime("DD MMM YYYY", virtualFloor.tResultSetMin)}
        </S.Title>
        <S.SubTitle>
          {localTime("H:mm", virtualFloor.tResultSetMin)}
        </S.SubTitle>
      </S.Td>
      <S.Td>
        <S.Title>
          {virtualFloor.totalSupply}
          {` `}
          {virtualFloor.paymentToken.symbol}
        </S.Title>
        <S.SubTitle>{virtualFloor.betaOpen}X</S.SubTitle>
      </S.Td>
      <S.Td>
        <S.IconWrapper
          ref={setReferenceElement}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          onClick={(e) => e.stopPropagation()}
          screenWidth={screenWidth}
        >
          {status}
          {isShowModal && (
            <S.Modal
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <SC.ModalText>{handleSetBetState(virtualFloor).status}</SC.ModalText>
            </S.Modal>
          )}
        </S.IconWrapper>
      </S.Td>
    </S.Wrapper>
  )

  if (isMobile) return renderBetList
  else return (
    <Link href={`/bet/#!/${hexToNumber(virtualFloor.id)}`} >
      <a>
        {renderBetList}
      </a>
    </Link>
  )
};

export default Bet;
