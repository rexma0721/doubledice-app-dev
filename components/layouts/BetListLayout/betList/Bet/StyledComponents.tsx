// Utils
import styled from 'styled-components'
import { supernova } from 'styles/colors';
import { Modal as SModal } from "components/shared/infoModal/StyledComponents";


interface IconWrapperI {
  screenWidth: number
}

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(#2F3140, #181924);
  height: 10rem;
  padding: 0 3rem;
  margin: 1rem 0;
  cursor: pointer;
  border-radius: 2rem;

  @media not all and (min-resolution:.001dpcm)  {
    @media only screen and (max-width: 768px) {
      padding: 0rem 2rem;
      height: 5rem;
      border-radius: 1rem;
    }
  }
`;

export const Td = styled.div`
  font-size: 1.3rem;

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

export const Title = styled.h6`
  font-size: 1.6rem;

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const CategoryText = styled.p`
  font-size: 1.2rem;
  color: ${supernova};
  margin-top: 0.5rem;

  @media not all and (min-resolution:.001dpcm) {    
    @media only screen and (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

export const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #999598;
  margin-top: 0.5rem;

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

export const imagesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  margin-right: 1rem;
  overflow: hidden;
  width: fit-content;
  height: fit-content;

  img{
    border-radius: 0.5rem;
  }
`;

export const IconWrapper = styled.div<IconWrapperI>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
  float: right;
  height: 5rem;
  max-width: fit-content;

  svg{ 
    width: 7.7rem;
    height: 3rem;
    fill: ${supernova};

    @media not all and (min-resolution:.001dpcm) {
      @media only screen and (max-width: 768px) {
        width: 3rem;   
        height: 3rem;  
      }
    }
  }
`;

export const Modal = styled(SModal)`
  width: fit-content;
  text-align: center;
`;