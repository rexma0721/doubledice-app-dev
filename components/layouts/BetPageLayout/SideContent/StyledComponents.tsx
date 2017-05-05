// Utils
import styled from 'styled-components'


interface AsideWrapperI {
  screenWidth: number | null
}

export const AsideWrapper = styled.div<AsideWrapperI>`
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;
  
  @media only screen and (max-width: 768px) {
    -moz-transform: ${props => (props.screenWidth ? `scale(${props.screenWidth / 800})` : "scale(1)")};
    -moz-transform-origin: right top;
  }

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      -webkit-transform: ${props => (props.screenWidth ? `scale(${props.screenWidth / 800})` : "scale(1)")};
      -webkit-transform-origin: right top;
    }
  }
`;

export const AsideSubWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const DiscordWidget = styled.div`
  position: absolute;
  right: 0rem;
  top: 27rem;
  width: 10rem;
  transition: all 0.4s ease-out;


  @media only screen and (max-width: 1400px) {
   width: 25rem;
  }

  @media only screen and (max-width: 1000px) {
  width: 20rem;
  }

  @media only screen and (min-width: 1400px) {
   width: 35rem;
  }
`;