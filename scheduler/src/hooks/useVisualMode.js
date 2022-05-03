import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //transition for the hook
  const transition = (newMode, replace = false) => {
    if (replace) {
      const newArr = [...history];
      newArr.pop()
      setHistory(newArr)
      setMode(newMode);
    } else{
      const newArr = [...history]
      newArr.push(newMode)
      setHistory(newArr)
      setMode(newMode)
    }
  }

  //back to the previous
  const back = () => {
    let newArr = [];

    if (history.length > 1) {
      newArr = [...history]
      newArr.pop();
      setMode(newArr[newArr.length -1])
      setHistory(newArr);
    } else {
      setMode(history[0])
    }
  }


  return { mode, transition, back, history };
}