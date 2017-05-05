// Utils
import { SpinnerDotted } from "spinners-react"

// Components
import * as S from "./StyledComponents"
import InfoModal from 'components/shared/infoModal'


interface PropsI {
  onClick: () => void
  disabled?: boolean
  isLoading: boolean
  active: boolean
  backgroundColor?: string
  title: string
  info?: string
}

const ChallengeResultsBox = ({
  onClick,
  disabled,
  active,
  backgroundColor,
  title,
  isLoading,
  info
}: PropsI) => {

  let theTitle = "Connect wallet"
  if (active) theTitle = title
  return (
    <S.Button
      type='button'
      onClick={onClick}
      disabled={disabled || isLoading}
      isDisabled={disabled || isLoading}
      backgroundColor={backgroundColor}
    >
      <S.TextWrapper>
        <S.Text>
          {isLoading ?
            <SpinnerDotted
              size={20}
              color="white"
              thickness={200}
              enabled={isLoading}
            />
            :
            theTitle
          }
          {info && active && (
            <S.InfoIconWrapper>
              <InfoModal description={info} color='white' />
            </S.InfoIconWrapper>
          )}
        </S.Text>
      </S.TextWrapper>
    </S.Button>
  );
};

export default ChallengeResultsBox;
