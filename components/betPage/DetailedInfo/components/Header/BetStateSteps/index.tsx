// Components
import * as SC from "components/shared/StepComponent/StyledComponents";
import * as S from "./StyledComponents";


interface PropsI {
  step: number
  resultInputFailed?: boolean
  isAdminInputFalse?: boolean
}

const StepComponent = ({ step, resultInputFailed, isAdminInputFalse }: PropsI) => {
  const stepOne = step == 1 || step == 2 || step == 3 || step == 4;
  const stepTwo = step == 2 || step == 3 || step == 4;
  const stepThree = step == 3 || step == 4;
  const stepFour = step == 4;

  return (
    <S.Wrapper>
      <SC.Container>
        <SC.ProgressBarContainer>
          <S.StepWrapper isActive={stepOne}>
            <S.Circle isActive={stepOne} />
            <S.Text>Betting closed</S.Text>
          </S.StepWrapper>
          <S.StepWrapper isActive={stepTwo}>
            <S.Circle isActive={stepTwo} isFailed={resultInputFailed} />
            <S.Text>Result input</S.Text>
          </S.StepWrapper>
          <S.StepWrapper isActive={stepThree}>
            <S.Circle isActive={stepThree} isEmpty={isAdminInputFalse} />
            <S.Text>Admin input</S.Text>
          </S.StepWrapper>
          <S.StepWrapper isActive={stepFour}>
            <S.Circle isActive={stepFour} />
            <S.Text>Resolved</S.Text>
          </S.StepWrapper>
        </SC.ProgressBarContainer>
      </SC.Container>
    </S.Wrapper>
  );
};

export default StepComponent;
