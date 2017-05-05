// Utils
import styled, { keyframes } from 'styled-components'
import { boulder, mirage, semiGray } from 'styles/colors';


interface LinkWrapperI {
  isActive?: boolean
}

export const rotate = keyframes`
  from{ transform: rotate(-360deg); }
  to{ transform: rotate(360deg); }
`;

export const sidebarAppear = keyframes`
  from{ 
    transform: translateX(-100%)
  }
  to{ 
    transform: translateX(0)    
  }
`;

export const Main = styled.div`
  position: absolute;
  left: 14rem;
  top: 50%;
  transform: translate(0, -50%);
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const ImageContainer = styled.div`
  margin-right: 1rem;
`

export const LinkWrapper = styled.div<LinkWrapperI>`
  padding: 1.5rem 2rem;
  cursor: pointer;
  transition: all 0.4s ease-out;
  color: ${props => props.isActive ? 'white' : boulder};
  font-size: 1.5rem;
  font-family: 'Russo One';
  text-transform: uppercase;

  & g{
      transition: all 0.4s ease-out;
      transform-origin: center;
    }
    
  & svg {    
    transition: all 0.4s ease-out;
  }

  &:hover {
    color: white;
  }

  &:hover g{
    animation: ${rotate} 5s infinite linear;
    opacity: 1;
  }

  &:hover svg {    
    color: white !important;
    transform: translateX(1rem);
  }

  &:hover path{
    opacity: 1;
  }

  @media only screen and (max-width: 1100px) {
    padding: 1.5rem 1rem;
  } 
`

export const ResponsiveLinkWrapper = styled(LinkWrapper)`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1100px) {
    padding: 1.5rem 2rem;
  } 
`

export const IconButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
`

export const CloseButton = styled.button`
  position: absolute;
  right: 3rem;
  top: 2rem;
  transform: translateX(50%);
`

export const Sidebar = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 25rem;
  height: 100%;
  padding: 2rem 0;
  background-color: ${mirage};
  border-right: 2px solid ${semiGray};
  z-index: 100001;
  animation: ${sidebarAppear} 0.2s ease-out forwards;
`

export const ResponsiveLinksWrapper = styled.div`
  margin-top: 2rem;
`

export const SidebarTitle = styled.h2`
  font-size: 2.5rem;
  color: ${boulder};
  padding: 0 2rem 2rem;
  font-family: 'Russo One';
  font-weight: 400;
  border-bottom: 2px solid ${semiGray};
`