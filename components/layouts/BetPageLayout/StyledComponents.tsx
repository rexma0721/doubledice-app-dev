import styled from 'styled-components'


interface ContentI {
  screenWidth: number | null
}

export const Content = styled.section<ContentI>`
  position: relative;
  height: 100%;
  width: fit-content;
  z-index: 1;
  width: 101rem;
  transition: all 0.4s ease-out;
  padding: 0 0 2rem;

  @media only screen and (max-width: 1300px) {
    width: 86rem;
  }

  @media only screen and (max-width: 1200px) {
    width: 76rem;
  }

  @media only screen and (max-width: 1100px) {
    width: 66rem;
  }

  @media only screen and (max-width: 950px) {
    width: 56rem;
  }

  @media only screen and (max-width: 850px) {
    width: 52rem;
  }
  
  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      -webkit-transform: ${props => (props.screenWidth ? `scale(${props.screenWidth / 800})` : "scale(1)")};
      -webkit-transform-origin: left top;
    }
  }
`
