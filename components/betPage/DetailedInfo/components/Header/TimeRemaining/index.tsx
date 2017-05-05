// Utils
import moment from "moment";
import { useEffect, useState } from "react";

// Components
import * as S from "./StyledComponents";

const clockColon = (
  <S.SVGContainer>
    <svg
      width="5"
      height="19"
      viewBox="0 0 5 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M2.07765 18.4978C1.4968 18.4978 1.00532 18.2968 0.60319 17.8946C0.201063 17.4925 0 17.001 0 16.4202C0 15.8393 0.201063 15.3478 0.60319 14.9457C1.00532 14.5436 1.4968 14.3425 2.07765 14.3425C2.63616 14.3425 3.10531 14.5436 3.4851 14.9457C3.88722 15.3478 4.08829 15.8393 4.08829 16.4202C4.08829 17.001 3.88722 17.4925 3.4851 17.8946C3.10531 18.2968 2.63616 18.4978 2.07765 18.4978ZM2.07765 4.15531C1.4968 4.15531 1.00532 3.95424 0.60319 3.55212C0.201063 3.14999 0 2.6585 0 2.07765C0 1.4968 0.201063 1.00532 0.60319 0.60319C1.00532 0.201063 1.4968 0 2.07765 0C2.63616 0 3.10531 0.201063 3.4851 0.60319C3.88722 1.00532 4.08829 1.4968 4.08829 2.07765C4.08829 2.6585 3.88722 3.14999 3.4851 3.55212C3.10531 3.95424 2.63616 4.15531 2.07765 4.15531Z"
        fill="white"
      />
    </svg>
  </S.SVGContainer>
);

interface PropsI {
  endTime: number;
  format?: string;
  title?: string;
}


const RemainingTime = ({ endTime, format, title }: PropsI) => {

  function getDurationLeft(): moment.Duration {
    const secondsLeft = Math.max(0, endTime - moment().unix()); // if time left is negative, show 0
    return moment.duration(1000 * secondsLeft);
  }

  const [diffDuration, setDiffDuration] = useState(getDurationLeft());

  useEffect(() => {
    if (moment().unix() <= endTime) {
      const intervalId = setInterval(() => {
        const durationLeft = getDurationLeft();
        setDiffDuration(durationLeft);
        if (durationLeft.asSeconds() === 0 && intervalId) clearInterval(intervalId);
      }, 1000);
    }
  }, []);

  function handleFormatNumber(num: number) {
    if (num < 10) return `0${num}`;
    else return num;
  }

  let renderBody;
  switch (format) {
    case "second":
      renderBody = (
        <S.Wrapper>
          <S.Header>{title}</S.Header>
          <S.Main>
            <S.Text>{diffDuration.hours() > 0 && `${handleFormatNumber(diffDuration.hours())}H`}</S.Text>
            <S.Text>
              {
                (diffDuration.hours() === 0 && diffDuration.minutes() === 0) ?
                  '' :
                  `${handleFormatNumber(diffDuration.minutes())}M`
              }
            </S.Text>
            <S.Text>{
              (diffDuration.hours() === 0 && diffDuration.minutes() === 0 && diffDuration.seconds() === 0) ?
                '' :
                `${handleFormatNumber(diffDuration.seconds())}S`
            }
            </S.Text>
          </S.Main>
        </S.Wrapper>
      );
      break;
    default:
      renderBody = (
        <S.Container>
          <S.TimeContainer>
            <S.Time>{handleFormatNumber(diffDuration.days())}</S.Time>
            <S.Title>DAY</S.Title>
          </S.TimeContainer>
          {clockColon}
          <S.TimeContainer>
            <S.Time>{handleFormatNumber(diffDuration.hours())}</S.Time>
            <S.Title>HR</S.Title>
          </S.TimeContainer>
          {clockColon}
          <S.TimeContainer>
            <S.Time>{handleFormatNumber(diffDuration.minutes())}</S.Time>
            <S.Title>MIN</S.Title>
          </S.TimeContainer>
          {clockColon}
          <S.TimeContainer>
            <S.Time>{handleFormatNumber(diffDuration.seconds())}</S.Time>
            <S.Title>SEC</S.Title>
          </S.TimeContainer>
        </S.Container>
      );
      break;
  }

  return renderBody;
};

export default RemainingTime;
