export const formatTime = (time: number): string => {
  return time > 9 ? time.toString() : `0${time}`;
};

export function getTime(timeDifference: number, format?: "addLeadingZero") {
  if (timeDifference < 0) {
    throw new Error('Invalid time difference. Time difference must be non-negative.');
  }

  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const millisecondsInHour = 1000 * 60 * 60;
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInSecond = 1000;

  const days = Math.floor(timeDifference / millisecondsInDay);
  const remainingHours = timeDifference % millisecondsInDay;
  const hours = Math.floor(remainingHours / millisecondsInHour);
  const remainingMinutes = remainingHours % millisecondsInHour;
  const minutes = Math.floor(remainingMinutes / millisecondsInMinute);
  const remainingSeconds = remainingMinutes % millisecondsInMinute;
  const seconds = Math.floor(remainingSeconds / millisecondsInSecond);

  const formattedHours = format ? formatTime(hours) : hours.toString();
  const formattedMinutes = format ? formatTime(minutes) : minutes.toString();
  const formattedSeconds = format ? formatTime(seconds) : seconds.toString();

  const resultString = `${days} Days ${formattedHours} hours ${formattedMinutes} minutes ${formattedSeconds} seconds`;

  const result = {
    result: resultString,
    days: days.toString(),
    hours: format ? formattedHours : hours.toString(),
    minutes: format ? formattedMinutes : minutes.toString(),
    seconds: format ? formattedSeconds : seconds.toString()
  };

  return result;
}
