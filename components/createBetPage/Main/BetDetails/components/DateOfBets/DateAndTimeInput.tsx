import { useEffect, useRef, useState, useLayoutEffect } from "react"

// Utils
import moment from "moment";

// Components
import * as S from "./StyledComponents"

interface PropsI {
  setTimestamp: any;
  value: number
}

const Main = ({ setTimestamp, value: universalTimestampSeconds }: PropsI) => {

  // ToDo: Read this from a central setting
  const utcOffsetMinutes = moment().utcOffset(); // e.g. will be 120 in UTC+0200

  const [time, setTime] = useState('00:00')
  const [date, setDate] = useState<any>(new Date());

  const componentMounted = useRef(false)

  const handleInputChange = (e: any) => {
    let input: string;
    if (e.target.name === "time") {
      setTime(e.target.value);
      input = `${date} ${e.target.value}`;
    } else if (e.target.name === "date") {
      setDate(e.target.value);
      input = `${e.target.value} ${time}`;
    } else {
      // ToDo: If this should be impossible, then assert(false)
      throw new Error('!');
    }
    const offsetMoment = moment(input, "YYYY-MM-DD hh:mm").utcOffset(
      utcOffsetMinutes,
      true // If input hh:mm is 23:45, passing keepLocalTime=true will assume it is 23:45 at the utcOffsetMinutes timezone
    )
    setTimestamp(offsetMoment.unix());
  }

  useLayoutEffect(() => {
    if (universalTimestampSeconds && !componentMounted.current) {
      const offsetMoment = moment.unix(universalTimestampSeconds).utcOffset(utcOffsetMinutes, false);
      setDate(offsetMoment.format('YYYY-MM-DD'));
      setTime(offsetMoment.format('HH:mm'));
      componentMounted.current = true;
    }
  }, [universalTimestampSeconds])


  return (
    <S.DateAndTimeInputContainer>
      <S.DateInput
        type="date"
        placeholder="MM\DD\YY"
        name="date"
        value={date}
        min={moment().format('YYYY-MM-DD')}
        onChange={handleInputChange}
      />
      <S.TimeInput
        type="time"
        value={time}
        name="time"
        onChange={handleInputChange}
      />
    </S.DateAndTimeInputContainer>
  );
};

export default Main;
