// Utils
import styled from 'styled-components'
import { confirmGreen } from 'styles/colors'
import { Circle as StepCircle, StepContainer, Text as StepText } from 'components/shared/StepComponent/StyledComponents'


interface InnerCircleI {
  isActive?: boolean
  isFailed?: boolean
  isEmpty?: boolean
}

export const Wrapper = styled.div`
  width: 50rem;
`

export const Circle = styled(StepCircle)<InnerCircleI>`
  position: relative;
  width: 2rem;
  height: 2rem;
  border: 0.35rem solid white;
  margin-top: -0.5rem;
  background-color: ${props => props.isEmpty ? "white" : props.isFailed ? 'red' : props.isActive ? confirmGreen : 'white'};
`

export const Text = styled(StepText)`
  top: 3rem;
  font-size: 1.2rem;
`

export const StepWrapper = styled(StepContainer)`
  &:after {
    width: 100%;
    height: 4px;
    content: '';
    position: absolute;
    top: 0.5rem;
    left: -50%;
    transform: translateY(-50%);
    background-color: white;
    z-index: -1;
  }
`
