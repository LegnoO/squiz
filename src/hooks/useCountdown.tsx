import { useEffect, useState } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: number): CountdownValues => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState<number>(
    countDownDate - new Date().getTime()
  );

  const getReturnValues = (countDown: number): CountdownValues => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return getReturnValues(countDown);
};

export { useCountdown };
