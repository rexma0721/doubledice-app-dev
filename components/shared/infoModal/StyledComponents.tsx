// Utils
import styled from "styled-components";

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: help;
`;

export const Modal = styled.div`
  background-color: white;
  padding: 1.5rem;
  width: 30rem;
  border-radius: 0.5rem;
  z-index: 100;

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      padding: 0.5rem;    
      width: 10rem;  
    }
  }
`;

export const ModalText = styled.p`
  font-size: 1.2rem;
  color: black;
  font-family: "Poppins" !important;

  @media not all and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  } 
`;
