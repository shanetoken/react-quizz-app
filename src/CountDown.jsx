import React, { useState, useEffect } from 'react';

function CountDown() {
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      document.getElementById('countdown').innerText = '🔥 00:00';
    }
  }, [timeLeft]);

  return (
    <div>
      <span id="countdown">⏳ 00:{('0' + timeLeft).slice(-2)}</span>
    </div>
  );
}

export default CountDown;
