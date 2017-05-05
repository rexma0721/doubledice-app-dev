// Utils
import styled, { keyframes } from 'styled-components'
import { boulder, mirage } from 'styles/colors';


interface NavbarContainerI {
  screenWidth: number | null
}

interface MainI {
  screenWidth: number | null
}

export const rotate = keyframes`
  from{ transform: rotate(-360deg); }
  to{ transform: rotate(360deg); }
`;

export const NavbarContainer = styled.nav<NavbarContainerI>`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%);
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${mirage};
  z-index: 100000;

  @media only screen and (max-width: 768px) {
    zoom: ${props => props.screenWidth ? `${props.screenWidth / 8}%` : '100%'}
  }
`

export const Main = styled.main<MainI>`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  
  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      padding: 0 1rem;
    }
  }
`

export const ImageContainer = styled.div`
  position: relative; 
  width: 6rem;
  height: 60px;
`