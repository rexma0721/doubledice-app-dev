import React from "react";

// Next
import Link from 'next/link'

// Components
import * as S from './StyledComponents'
import * as SC from '../ChooseOption/shared/StyledComponents'

const LinkToBetListButton = () => {
  return (
    <SC.Container>
      <Link href='/'>
        <a>
          <S.Text>Check out other live Bets</S.Text>
        </a>
      </Link>
    </SC.Container>
  );
};

export default LinkToBetListButton;
