import { useEffect, useState } from "react";

// Utils
import Confetti from 'react-confetti'
import ReactAudioPlayer from 'react-audio-player'

// Components
import Portal from "components/shared/Portal"


const CongratulationsEffect = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)


  useEffect(() => {
    setScreenHeight(window.innerHeight)
  }, [window.innerHeight])

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [window.innerWidth])
  
  return (
    (screenWidth && screenHeight) ?
      <Portal>
        <>
          <Confetti
            width={screenWidth}
            height={screenHeight}
            recycle={false}
            numberOfPieces={400}
          />
          <ReactAudioPlayer
            src="/sounds/horn.mp3"
            autoPlay
            volume={0.01}
          />
        </>
      </Portal>
      : null
  );
};
export default CongratulationsEffect;
