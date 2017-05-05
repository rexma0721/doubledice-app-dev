import { localTime } from "utils/helpers";

// Components
import * as S from "./StyledComponents";

interface PropsI {
  betClose: string
  isEnded?: boolean
}

const BetBy = ({ betClose: tClose, isEnded }: PropsI) => {

  return (
    <S.Wrapper>
      <S.Title>{isEnded ? 'Betting ended' : 'Bet by'}</S.Title>
      <S.Description>
        {localTime("DD MMMM YYYY", tClose)}{" "}
        {localTime("H:mm", tClose)}
      </S.Description>
    </S.Wrapper>
  );
};

export default BetBy;
