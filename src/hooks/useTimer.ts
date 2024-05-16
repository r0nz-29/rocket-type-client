import {useEffect, useState} from "react";
import {GAME_MODES, GAME_STATES, useStore} from "../store";

export default function useTimer(duration: number, mode = GAME_MODES.SOLO) {
  const [timerInSec, setTimerInSec] = useState(duration);
  const {gameState, updateGameState, activeDuration} = useStore();
  const {gameTimer: currentTime} = useStore(state => state.multiplayer);

  useEffect(() => {
    if (mode === GAME_MODES.MULTIPLAYER) return;
    setTimerInSec(activeDuration);
  }, [activeDuration, mode]);

  useEffect(() => {
    if (mode === GAME_MODES.MULTIPLAYER || gameState === GAME_STATES.IDLE || gameState === GAME_STATES.COMPLETED) return;

    let i = duration;
    const interval = setInterval(function () {
      if (i <= 0) {
        updateGameState(GAME_STATES.COMPLETED);
        clearInterval(interval);
        return;
      }
      i--;
      console.log("minus");
      setTimerInSec(i);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameState, updateGameState, mode]);

  if (mode === GAME_MODES.MULTIPLAYER) return {currentTime};
  return {currentTime: timerInSec};
}