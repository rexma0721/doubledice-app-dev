import React, { ReactChildren, ReactChild, useState, useLayoutEffect } from 'react'

// Utils
import { VirtualFloor } from "lib/graph"

// Components
import * as S from './StyledComponents'
import PendingPage from "components/betPage/PendingPage"
import SideContent from "./SideContent"
import FullLayout from 'components/layouts/fullLayOut'
// import SideBar from './components/SideBar'


interface AuxPropsI {
  children: React.ReactNode
  vf: VirtualFloor
}

const BetPageLayout = ({ children, vf }: AuxPropsI) => {
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
    <FullLayout>
      <>
        {Boolean(vf.id) && <SideContent vf={vf} />}
        <S.Content screenWidth={screenWidth}>
          {Boolean(vf.id) ? children : <PendingPage />}
        </S.Content>
      </>
    </FullLayout>
  )
}

export default BetPageLayout