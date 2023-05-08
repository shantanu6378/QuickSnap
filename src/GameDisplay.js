import React, { useState, useEffect } from 'react';


function GameDisplay(){
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = Math.floor(Math.random() * 4) + 1;
      setNumber(newNumber);
      setCount(prevCount => prevCount + 1);
    }, 1000);

    if (count >= 2) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="numbox">
      <h1>{number}</h1>
    </div>
  );
}

export default GameDisplay;