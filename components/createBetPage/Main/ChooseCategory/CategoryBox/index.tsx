import React, { Fragment } from "react"

// Next
import Image from "next/image"
import { CategoryData } from "utils/categories"

// Utils
import getImageUrl from 'utils/getImageUrl'
import assert from "assert"

// Components
import * as S from "./StyledComponents"

interface PropsI {
  category: CategoryData;
  featuredSubcategorySubids?: string[];
  translateY?: number;
  onCategorySelected: (selectedCategoryId: string) => void;
}

const ChooseCategory = ({
  category: {
    id,
    title,
    subcategories,
    backgroundColor,
    overlayColor,
    logoImageSrc
  },
  featuredSubcategorySubids,
  translateY,
  onCategorySelected
}: PropsI) => {
  const subcategorySubids = featuredSubcategorySubids || subcategories.map(({ subid }) => subid);

  // Always filter out 'test' subcategory from category subtitle
  const filteredSubcategorySubids = subcategorySubids.filter(subid => subid !== 'test');

  const containsOnlyOther = filteredSubcategorySubids.length === 1 && filteredSubcategorySubids[0] === 'other';

  const subcategoriesBySubid = new Map(subcategories.map(({ subid, ...rest }) => [subid, rest]));

  const subcategoryTitles = containsOnlyOther
    ? []
    : filteredSubcategorySubids.map(subid => {
      const subcategory = subcategoriesBySubid.get(subid);
      assert(subcategory, `No subcategory with subid ${subid}`);
      return subcategory.title;
    });

  // ToDo: Drop this and make 'other' category like the rest
  const isOtherCategory = id === 'other';

  // ToDo: Show category title at a fixed position (e.g. middle of card),
  // otherwise its vertical position will vary between categories,
  // depending on the height of the description-container

  return (
    <S.Button
      overlayColor={overlayColor}
      translateY={translateY}
      onClick={() => onCategorySelected(id)}
    >
      {!isOtherCategory &&
        <>
          <S.CardBoxSkewed backgroundColor={backgroundColor}></S.CardBoxSkewed>
          <S.CardBoxImageContainer translateY={translateY}>
            <Image
              src={getImageUrl(logoImageSrc, true)}
              className='cardBoxImage'
              objectFit="contain"
              layout="fill"
              loading='lazy'
            />
          </S.CardBoxImageContainer>
        </>}
      <S.TitleContainer
        isCenter={isOtherCategory}
        isCrypto={id === "crypto" && true}
      >
        <S.Title isCrypto={id === "crypto" && true}>{title}</S.Title>
        <S.Description>
          {
            subcategoryTitles.map((text, i) => {
              return (
                <Fragment key={i}>
                  <S.SubTitle>{text}</S.SubTitle>
                  {(i !== subcategoryTitles.length - 1) && <S.Dot>.</S.Dot>}
                </Fragment>
              )
            })
          }
        </S.Description>
      </S.TitleContainer>
    </S.Button>
  );
};

export default ChooseCategory;
