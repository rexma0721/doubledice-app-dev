// Utils
import styled from 'styled-components'
import { gunmetal } from 'styles/colors';


export const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const Button = styled.button`
  border-radius: 0.5rem;
  background-color: ${gunmetal};
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 2.5rem 0 2rem;
`;

export const Title = styled.p`
  color: white;
  font-size: 2rem;
  margin-left: 1rem;
`;

export const Modal = styled.div`
  position: absolute;
  top: 6rem;
  left: 0;
  width: 30rem;
  background-color: ${gunmetal};
  border-radius: 0.5rem;
  padding: 1rem 0;
`;
