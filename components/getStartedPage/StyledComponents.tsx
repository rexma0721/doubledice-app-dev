import styled from "styled-components";
import { Wrapper } from "components/shared/StyledComponents";
import { confirmGreen, steelGray, supernova } from "styles/colors";


interface ButtonI {
  isActive?: boolean
}

interface ImageWrapperI {
  isBackgroundWhite?: boolean
}

export const GettingStartedWrapper = styled(Wrapper)`
  margin: 5rem 0;
  color: white;
  padding: 1rem 3rem 6rem;
`;

export const Title = styled.h2`
  font-size: 3rem;
  margin: 2rem 0 6rem 0;
  text-align: center;
`;

export const SubTitle = styled.h3`
  font-size: 2.5rem;
  margin: 6rem 0;
  display: flex;
  align-items: center;
`;

export const TokensTitle = styled.h3`
  font-size: 2.5rem;
  margin: 6rem 0;
  text-align: center;
  width: 100%;
`;

export const OrderedListWrapper = styled.ol`
  padding: 0 3rem;
`;

export const List = styled.li`
  font-size: 2rem;
  margin: 2rem 0;

  ::marker {
    color: ${supernova};
    margin-right: 1rem;
  }
`;

export const ATag = styled.a`
  color: ${supernova};
  cursor: pointer;
`;

export const LinkWrapper = styled.span`
  color: ${supernova};
  cursor: pointer;
`;

export const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 1000px) {
    justify-content: center;
  } 
`;

export const TokenLink = styled.a`
  position: relative;
  margin: 1rem 2rem;
  background-color: ${steelGray};
  width: 14rem;
  height: 5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p{      
    transition: all 0.2s ease-out;
  }

  &:hover{
    p {      
      color: ${supernova};
    }
  }
`;

export const ImageWrapper = styled.div<ImageWrapperI>`
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.5rem;
  max-width: 3rem;
  max-height: 3rem;
  background-color: ${props => props.isBackgroundWhite ? 'white' : 'transparent'};
`;

export const TokenText = styled.p`
  font-size: 1.5rem;
  position: absolute;
  left: 7rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const Button = styled.button<ButtonI>`
  transition: all 0.2s ease-out;
  color: ${props => props.isActive ? 'white' : confirmGreen};
  font-size: 2rem;
  pointer-events: ${props => props.isActive ? 'none' : 'inherit'};
`;

export const Circle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${supernova};
  margin-right: 1rem;
`;
