// Utils
import styled, { keyframes } from "styled-components"
import { mirage, supernova } from "styles/colors"


export const Button = styled.button`
  color: ${supernova};
`;

export const Modal = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 40rem;
  border-radius: 0.5rem;
  padding: 2rem 2rem 3rem;
  text-align: center;
  z-index: 100001;

  @media only screen and (max-width: 600px) {    
    width: 80vw;
  }
`;

export const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const TextBox = styled.div`
  border: gray;
  height: 45rem;
  overflow: auto;
  text-align: left;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: justify;
`;

export const ListWrapper = styled.ul`
  padding: inherit;
  padding-top: 1rem;
  padding-left: 3rem;
`;

export const ModalButton = styled.button`
  background-color: ${supernova};
  padding: 0 2rem;
  height: 4rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Poppins';
`;

export const ModalTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 2rem;
  margin: 2rem 0 0;
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 1.5rem;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.2s ease-out;
  }

  &:hover svg{
    transform: scale(1.05);
  }
`