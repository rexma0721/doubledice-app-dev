// Utils
import styled from "styled-components";
import { confirmGreen } from "styles/colors";
import { IConnectWalletProps } from ".";

export const ButtonWrapper = styled.div<IConnectWalletProps>`
  width: ${({ buttonWidth }) => buttonWidth ||  "12rem"};
  height: ${({ buttonHeight }) => buttonHeight || "4rem"};
`;

export const ConfirmButton = styled.button<IConnectWalletProps>`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: ${({ fontSize }) => fontSize || "1.1rem"};
  font-family: "Poppins";
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
`;
