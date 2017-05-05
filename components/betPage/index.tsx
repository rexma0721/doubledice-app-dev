// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import { useQuery } from "@apollo/client"
import DetailedInfo from "components/betPage/DetailedInfo"
import Header from "components/betPage/Header"
import Sources from "components/betPage/Sources"
// Components
import { VirtualFloor } from "lib/graph"
import { ReactElement, useLayoutEffect, useState } from "react"
// Utils
import styled from "styled-components"

const SCMain = styled.section`
  width: 100%;
  
  @media only screen and (max-width: 768px) {
    -moz-transform: ${props => (props.screenWidth ? `scale(${props.screenWidth / 800})` : "scale(1)")};
    -moz-transform-origin: left top;
  }
`;

const SCMainContainer = styled.main`
  position: relative;
  width: 100%;
  z-index: 10;
  max-width: 95rem;
  min-width: 50rem;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

interface IProps {
  vf: VirtualFloor;
}

const BetPage = ({ vf }: IProps): ReactElement => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return (
    <SCMain data-name="main-bet-page" screenWidth={screenWidth}>
      <SCMainContainer>
        <Header
          opponents={vf.opponents}
          title={vf.title}
          description={vf.description}
        />
        <DetailedInfo virtualFloor={vf} />
        <Sources sources={vf.resultSources} />
      </SCMainContainer>
    </SCMain>
  );
};

export default BetPage;