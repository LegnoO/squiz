import React from "react";
import useCountdown from "@/hooks/useCountdown";
import { getTime } from "@/utils/timeUtils";

interface Props {
  targetDate: number;
}

const CountdownTimer: React.FC<Props> = ({ targetDate }) => {
  const { days, hours, minutes, seconds } = getTime(
    useCountdown(targetDate),
    "addLeadingZero",
  );

  return (
    <span className="flex flex-col">
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export default CountdownTimer;
