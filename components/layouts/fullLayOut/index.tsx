import React, {
  ReactChildren,
  ReactChild,
  useState,
  useLayoutEffect,
} from "react";

// Utils
import { ToastContainer } from "react-toastify";

// Components
import Navbar from "../shared/Navbar";
import * as S from "./StyledComponents";
// import SideBar from './components/SideBar'

interface AuxPropsI {
  children: React.ReactNode;
}

const FullLayout = ({ children }: AuxPropsI) => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <S.FullLayoutContainer>
      <Navbar />
      {/* <SideBar/> */}
      <S.Main id="main-container" screenWidth={screenWidth}>
        <S.SubMain>{children}</S.SubMain>
      </S.Main>
      <S.BackgroundImage />
      <ToastContainer autoClose={10000} />
    </S.FullLayoutContainer>
  );
};

export default FullLayout;
