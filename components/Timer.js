'use client'; // Mark this as a Client Component
import { useState, useEffect } from 'react';

export default function Timer({ isPaused }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return <div className="timer">Timer: {time}s</div>;
}