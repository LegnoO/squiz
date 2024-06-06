import { useEffect, useState } from "react";

const useCountdown = (targetDate: number) => {

  const [timeLeft, setTimeLeft] = useState<number>(targetDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

export default useCountdown;
