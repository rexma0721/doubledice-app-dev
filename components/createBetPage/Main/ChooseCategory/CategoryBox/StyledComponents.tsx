// Utils
import styled from 'styled-components'

interface ButtonI {
  overlayColor: string
  translateY?: number
}

interface CardBoxSkewedI {
  backgroundColor: string
}

interface TitleContainerI {
  isCenter?: boolean
  isCrypto?: boolean
}

interface CardBoxImageContainerI {
  translateY?: number
}

interface TitleI {
  isCrypto?: boolean
}

export const Button = styled.button<ButtonI>`
  position: relative;
  width: 27rem;
  height: 30rem;
  display: flex;
  align-items: flex-end;
  transform-style: preserve-3d;
  color: white;
  margin: 2rem 0rem;
  
  &::after{
    position: absolute;
    bottom: 0;
    left: 50%;
    content: '';
    width: 24rem;
    height: 30rem;
    background: ${props => props.overlayColor};
    z-index: 20;
    transform: skew(-8deg) translateX(-50%);
    transition: 0.4s linear;
  }

  img{    
    -webkit-backface-visibility: hidden; 
    -ms-transform: translateZ(0); /* IE 9 */
    -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
    transform: translateZ(0);
  }

  &:hover img{
    transform: scale(1.01) ${props => props.translateY ? `translateY(${props.translateY - 0.2}rem)` : `translateY(${-0.2}rem)`} translateZ(0);
  }
`

export const CardBoxSkewed = styled.div<CardBoxSkewedI>`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 24rem;
  height: 30rem;
  background:  ${props => props.backgroundColor};
  z-index: 1;
  transform: skew(-8deg) translateX(-50%);
`

export const CardBoxImageContainer = styled.div<CardBoxImageContainerI>`
  position: absolute;
  bottom: 0;
  left: 47%;
  width: 24rem;
  height: 34rem;
  z-index: 10;
  transition: all 0.4s ease-out;
  transform: translateX(-50%);
  clip-path: inset( -100vw -100vw 0 -100vw );
  cursor: default;
 
  .cardBoxImage{
    transform: ${props => `translateY(${props.translateY}rem)`};
  }
`

export const TitleContainer = styled.div<TitleContainerI>`
  position: relative;
  transition: all 0.4s ease-out;
  padding: ${props => props.isCenter ? '2.5rem 2rem 1rem 0rem' : '1rem 2rem 1rem 0rem'};
  text-align: center;
  bottom: ${props => props.isCenter && "46%"};
  z-index: 50;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${props => props.isCenter ? "50%" : "100%"};
  width: 100%;
  justify-content: ${props => props.isCenter ? 'center' : 'flex-end'};

  &:hover h3{
    top: ${props => props.isCrypto ? '65%' : '70%'};
  }

  &:hover > div{
    opacity: 1;
  }
`

export const Title = styled.h3<TitleI>`
  font-weight: bold;
  padding: 0.5rem 1rem;
  font-size: 2.4rem;
  z-index: 100;
  text-transform: uppercase;
  position: absolute;
  top: ${props => props.isCrypto ? '71%' : '80%'};
  -webkit-transition: top 1s;
  transition: top 0.4s;
`

export const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  color: #B8B8B8;
  transition: all 0.5s ease-out;
  opacity: 0;
`

export const Dot = styled.p`
  text-align: center;
  font-size: 1.4rem;
  padding-right: 0.5rem;
  margin-top: -0.8rem;
`

export const SubTitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  padding-right: 0.5rem;
`