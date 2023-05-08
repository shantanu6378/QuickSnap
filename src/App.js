import React, { useState, useEffect } from "react";
import "./App.css";
// import GameDisplay from "./GameDisplay.js"



function DigitAnimation({ onAnimationFinish, duration }) {
  const [number, setNumber] = useState(null);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (showCountdown) {
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      
      if (countdown === 0) {
        clearInterval(countdownInterval);
        setShowCountdown(false);
        setNumber(Math.floor(Math.random() * 4) + 1);
      }
      
      return () => clearInterval(countdownInterval);
    } else {
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
    }
  }, [showCountdown, countdown, onAnimationFinish, duration, count]);

  return (
    
    <div className="numbox">

      {showCountdown && (
        <div className="countdown">
          <div className="crosshair" />
          <h1 style = {{fontsize: "40px", color: 'rgb(19, 41, 75)'}}>{countdown}</h1>
        </div>
      )}
      {!showCountdown && (
        <h1 className="digit" style={{animationDuration: `${duration/1000}s`}}>{number}</h1>
      )}
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
     <h1 style={{ fontSize: '30px', color: 'rgb(176, 62, 28)', margin: '20px' }}>Follow the Stimulus</h1>
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
        {/* <h1 style = {{fontsize: '30px', color:'red', margin: '70px 20px'}}>Follow the Stimulus</h1> */}
      </div>
    </div>
  );
}


export default App;
