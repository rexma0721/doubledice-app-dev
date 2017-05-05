// Utils
import styled from "styled-components";
import { confirmGreen, mirage } from "styles/colors";
interface ClaimButtonI {
  backgroundColor?: string;
  isDisabled?: boolean;
}
interface HeaderContainerI {
  justifyContent?: string;
}

interface HeaderTitleI {
  paddingTop?: string;
}

interface SubTitleI {
  margin?: string;
}

export const Main = styled.main`
  color: white;
  height: fit-content;
`;

export const SectionContainer = styled.main`
  min-height: 20rem;
`;

export const Header = styled.div<HeaderContainerI>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  padding: 2rem;
`;

export const HeaderTitle = styled.div<HeaderTitleI>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: fit-content;
  padding: 0 2rem;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0")};
`;

export const Title = styled.h2`
  margin: 2rem 0;
  color: white;
  text-align: center;
  font-size: 1.4rem;
  font-family: "Poppins" !important;
  opacity: 0.7;
`;
export const Subtitle = styled.h3<SubTitleI>`
  margin: ${props => props.margin ? props.margin : '2rem 0'};
  color: white;
  text-align: center;
  font-size: 2rem;
`;
export const Description = styled.h2`
  color: white;
  text-align: center;
  font-size: 2rem;
`;

export const ConfirmButton = styled.button`
  width: 42rem;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: ${confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: 1.6rem;
  font-family: "Poppins";
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
`;

export const Footer = styled.footer`
  margin-top: 2rem;
`;

export const ClaimButton = styled.button<ClaimButtonI>`
  width: 10rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: ${confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: 1.2rem;
  font-family: "Poppins";
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
`;
