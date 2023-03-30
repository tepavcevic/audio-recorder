import { useState } from 'react';

const handleRecordingTimer = () => {
  const [intervalId, setIntervalId] = useState(0);

  return {
    start: (setTimer) => {
      const newIntervalId = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
      setIntervalId(newIntervalId);
    },
    stop: (setTimer) => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        setTimer(0);
      }
    },
  };
};

export default handleRecordingTimer;
