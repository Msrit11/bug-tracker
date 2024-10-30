// components/Timer.js
import { useState, useEffect } from 'react';

const Timer = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    onTimeUpdate(seconds);
  }, [seconds, onTimeUpdate]);

  const handleStartPause = () => setIsActive(!isActive);
  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="timer">
      <p>Time Spent: {Math.floor(seconds / 60)}m {seconds % 60}s</p>
      <button onClick={handleStartPause}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
