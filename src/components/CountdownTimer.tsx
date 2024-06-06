import { useState, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import { getTime } from "@/utils/timeUtils";

interface Props {
  targetDate: number;
}
interface ITime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountdownTimer: React.FC<Props> = ({ targetDate }) => {
  const timeCountDown = useCountdown(targetDate);

  const [time, setTime] = useState<ITime>({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const { days, hours, minutes, seconds } = getTime(
      timeCountDown,
      "addLeadingZero",
    );

    
    console.log({targetDate });
    console.log({timeCountDown });
  
    console.log({ days, hours, minutes, seconds });
    setTime({ days, hours, minutes, seconds });
  }, [timeCountDown]);

  return (
    <span className="flex flex-col">
      {time.hours}:{time.minutes}:{time.seconds}
    </span>
  );
};

export default CountdownTimer;
