import React from "react";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  targetDate: number;
}

const CountdownTimer: React.FC<Props> = ({ targetDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const formatTime = (time: number) => {
    return time > 9 ? time : `0${time}`;
  };

  if (hours + minutes + seconds <= 0) {
    return <span>00:00:00</span>;
  } else {
    return (
      <span className="flex flex-col">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
    );
  }
};

export default CountdownTimer;
