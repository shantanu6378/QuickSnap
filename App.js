import React, { useState, useEffect } from "react";
import "./App.css";
// import GameDisplay from "./GameDisplay.js"



function DigitAnimation({ onAnimationFinish, duration }) {
  const [number, setNumber] = useState(Math.floor(Math.random() * 4) + 1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = Math.floor(Math.random() * 4) + 1;
      setNumber(newNumber);
      setCount(prevCount => prevCount + 1);
    }, duration);

    if (count >= 10) {
      clearInterval(interval);
      onAnimationFinish();
    }

    return () => clearInterval(interval);
  }, [count, onAnimationFinish, duration]);

  return (
    <div className="numbox">
      <h1 style={{animationDuration: `${duration/1000}s`}}>{number}</h1>
    </div>
  );
}

function GameDisplay({ onAnimationFinish, duration }) {
  return <DigitAnimation onAnimationFinish={onAnimationFinish} duration={duration} />;
}

function App() {
  const [display, setDisplay] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000);

  const handleAnimationFinish = () => {
    setDisplay(false);
  };

  const handleClick = () => {
    setDisplay(true);
  };

  const handleIntervalChange = (e) => {
    setIntervalTime(3000 - e.target.value);
  };

  return (
    <div className="main">
      <div className="button-container">
        {display && <GameDisplay onAnimationFinish={handleAnimationFinish} duration={intervalTime} />}
        <div className="slider-container">
          <label htmlFor="slider">Difficulty</label>
          <input type="range"
          min="0"
          max="2500"
          value={3000 - intervalTime}
          onChange={handleIntervalChange}
          />
        </div>
        <button onClick={handleClick}>Play</button>
      </div>
    </div>
  );
}


export default App;
