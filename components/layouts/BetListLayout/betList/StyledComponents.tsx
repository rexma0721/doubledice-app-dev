import styled, { keyframes } from "styled-components";
import { mirage } from "styles/colors";


const Heading = keyframes`
  0% { opacity: 0; }
  100% { 
    opacity: 0.7;
  }
`;

interface IBackToTopButton {
  isScrollButtonVisible: boolean
  screenWidth: number | null
}

interface TitleI {
  textRight?: boolean
}

export const Table = styled.table`
  width: 100%;
  color: white;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SubSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MessageWrapper = styled(SpinnerWrapper)`
  background-color: ${mirage};
  border-radius: 1.2rem;
  padding: 2rem 4rem;
`;

export const Text = styled.h3`
  color: white;
  font-size: 2.5rem;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
  height: 9rem;
  padding: 0 3rem;
  margin: 2rem 0;
  position: sticky;
  top: 0;
  background-color: ${mirage};
  border-radius: 15px;
  z-index: 10;
  
  @media not all and (min-resolution:.001dpcm) {    
    @media only screen and (max-width: 768px) {
      padding: 0 2rem;
      height: 5rem;
    }
  }
`;

export const Title = styled.h2<TitleI>`
  font-size: 2rem;
  text-transform: uppercase;
  text-align: ${props => props.textRight ? 'right' : 'left'};

  @media not all and (min-resolution:.001dpcm) {    
    @media only screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

export const ButtonContainer = styled.a<IBackToTopButton>`
  position: fixed;
  bottom: 45px;
  right: 49px;
  align-items: center;
  height: 45px;
  width: 45px;
  justify-content: center;
  animation: ${Heading};
  animation-duration: 0.8s;
  z-index: 1000;
  cursor: pointer;
  opacity: 0.7;
  background: #fff;
  border-radius: 22px;
  transition: opacity 0.5s, color ease-in-out 0.2s, background ease-in-out 0.2s;
  display: ${({ isScrollButtonVisible }) =>
    isScrollButtonVisible ? "flex" : "none"};

  &:hover {
    opacity: 1;
  }
  
  @media only screen and (max-width: 768px) {
    transform: ${props => (props.screenWidth ? `scale(${1 / (props.screenWidth / 800)})` : "scale(1)")};
  }
`;
