import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0); // タイマーの残り秒数を保持

  useEffect(() => {
    let interval = null;
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      alert('時間になりました！'); // 時間切れを通知
    }
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  // totalSecondsが変更されたら、minutesとsecondsを更新
  useEffect(() => {
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
  }, [totalSeconds]);

  const handleStart = () => {
    // ユーザーが入力した分と秒からtotalSecondsを計算
    const inputMinutes = parseInt(document.getElementById('inputMinutes').value) || 0;
    const inputSeconds = parseInt(document.getElementById('inputSeconds').value) || 0;
    setTotalSeconds(inputMinutes * 60 + inputSeconds);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
    document.getElementById('inputMinutes').value = '';
    document.getElementById('inputSeconds').value = '';
  };

  return (
    <div className="timer-container">
      <h2>シンプルなタイマー</h2>
      <div className="time-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="input-section">
        <input
          type="number"
          id="inputMinutes"
          placeholder="分"
          min="0"
          max="59"
          disabled={isRunning}
        />
        <input
          type="number"
          id="inputSeconds"
          placeholder="秒"
          min="0"
          max="59"
          disabled={isRunning}
        />
      </div>
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>開始</button>
        <button onClick={handleStop} disabled={!isRunning}>停止</button>
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  );
};

export default Timer;