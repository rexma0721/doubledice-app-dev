import React, { useEffect, useLayoutEffect, useState } from "react";

// Utils
import { useMediaQuery } from "react-responsive";

// Components
import * as S from "./StyledComponents";
import RightSideInfo from 'components/betPage/RightSideInfo'
import DiscordWidget from 'components/shared/discordWidget'

// GraphQL
import { VirtualFloor } from "lib/graph";
import { DISCORD_CHANNEL_ID_NONE } from "utils/helpers";


interface PropsI {
  vf: VirtualFloor
}

const SideBar = ({ vf }: PropsI) => {
  const [discordWidgetHeight, setDiscordWidgetHeight] = useState<string>('300px')
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  const isLaptopExtremelySmall = useMediaQuery({ query: '(max-height: 700px)' })
  const isLaptopVerySmall = useMediaQuery({ query: '(max-height: 800px)' })
  const isLaptopSmall = useMediaQuery({ query: '(max-height: 900px)' })
  const isLaptop = useMediaQuery({ query: '(max-height: 1000px)' })
  const isLaptopBig = useMediaQuery({ query: '(min-height: 1000px)' })

  useEffect(() => {
    let newDiscordWidgetHeight = '350px';
    if (isLaptopExtremelySmall) newDiscordWidgetHeight = '250px'
    else if (isLaptopVerySmall) newDiscordWidgetHeight = '350px'
    else if (isLaptopSmall) newDiscordWidgetHeight = '450px'
    else if (isLaptop) newDiscordWidgetHeight = '500px'
    else if (isLaptopBig) newDiscordWidgetHeight = '600px'

    setDiscordWidgetHeight(newDiscordWidgetHeight)
  }, [isLaptopExtremelySmall, isLaptopSmall, isLaptopSmall, isLaptopVerySmall, isLaptopBig])

  useLayoutEffect(() => {
    function updateSize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  const showDiscordWidget = vf.discordChannelId && vf.discordChannelId !== DISCORD_CHANNEL_ID_NONE;

  return (
    <S.AsideWrapper screenWidth={screenWidth}>
      <S.AsideSubWrapper>
        <RightSideInfo vf={vf} />
        {showDiscordWidget && <S.DiscordWidget>
          <DiscordWidget
            channel={vf.discordChannelId}
            style={{
              width: "100%",
              height: discordWidgetHeight,
            }}
          />
        </S.DiscordWidget>}
      </S.AsideSubWrapper>
    </S.AsideWrapper>
  );
};

export default SideBar;
