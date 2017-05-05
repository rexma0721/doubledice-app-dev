// Utils
import styled from 'styled-components'


interface MainI {
  step: number
}

export const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
`;

export const Main = styled.main<MainI>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: auto;
`;