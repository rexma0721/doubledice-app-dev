// Utils
import styled, { keyframes } from "styled-components"
import { mirage } from "styles/colors"


export const appear = keyframes`
  from{ 
    background-color: transparent;
   }
  to{ 
    background-color: rgba(0, 0, 0, 0.7);
    }
`;

export const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  height: fit-content;
  background-color: ${mirage};
  border-radius: 1.2rem;
  padding: 0 0 2.7rem;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  z-index: 100000;
  animation: ${appear} 0.4s ease-out forwards;
`