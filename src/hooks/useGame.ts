import {GAME_MODES, GAME_STATES, SPECIAL_KEYS, useStore} from "../store";
import {useCallback, useEffect, useState} from "react";
import {calculateWPM} from "../utils";
import useTimer from "./useTimer.ts";
import useSocket from "./useSocket.ts";

export default function useGame(duration: number, mode = GAME_MODES.SOLO, isDarkMode: boolean) {
  const {currentTime} = useTimer(duration, mode);
  const {
    typedParagraph: typed,
    cursorPosition: cursor,
    errors,
    gameState,
    incrementCursor,
    incrementErrors,
    multiplayer,
    soloParagraph,
    updateGameState,
    updateTypedParagraph: updateParagraph,
    updateWpmGraph,
    updateErrorGraph
  } = useStore();

  const {roomId} = useStore(state => state.multiplayer);
  const {syncResults} = useSocket();

  const words = (mode === GAME_MODES.MULTIPLAYER) ? multiplayer.paragraph ?? "" : soloParagraph;

  const [liveWpm, setLiveWpm] = useState(0);

  function startGame() {
    console.log("starting game");
    updateGameState(GAME_STATES.TYPING);
  }

  function stopGame() {
    console.log("stopping game");
    updateGameState(GAME_STATES.COMPLETED);
  }

  useEffect(() => {
    if (gameState === GAME_STATES.COMPLETED && mode === GAME_MODES.MULTIPLAYER) {
      // const acc = 100 * ((typed.length - errors) / typed.length);
      // const wpm = calculateWPM(typed, errors, duration - currentTime);
      // socket.emit("new_wpm", {
      //   speed: wpm,
      //   pos: cursor,
      //   over: true,
      //   errors: errors,
      //   accuracy: acc > 0 ? acc : 0
      // });
      // console.log("sent");
    }
  }, [gameState]);

  useEffect(() => {
    if (!words) return;
    if (cursor === words.length) {
      updateGameState(GAME_STATES.COMPLETED);
    }
  }, [cursor, updateGameState, words]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (!words) return;
    if (gameState !== GAME_STATES.TYPING || SPECIAL_KEYS.has(e.key)) return;

    const identifier = (mode === GAME_MODES.MULTIPLAYER) ? "multi-char-at" : "char-at";

    const char = document.getElementById(`${identifier}-${cursor}`);
    if (!char) return;

    if (e.key !== words[cursor]) {
      char.style.color = "#f00";
      char.style.fontWeight = "bold";
      incrementErrors();
      return;
    } else {
      console.log(isDarkMode);
      char.style.color = isDarkMode ? "#fff" : "#000";
      char.style.fontWeight = "bold";
    }

    updateParagraph(e.key);
    incrementCursor();
  }, [gameState, words, cursor, incrementErrors]);

  useEffect(() => {
    if (gameState !== GAME_STATES.TYPING) return;

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameState, handleKeydown]);

  useEffect(() => {
    if (currentTime < 0 || gameState !== GAME_STATES.TYPING) return;
    const wpm = calculateWPM(typed, errors, duration - currentTime);
    setLiveWpm(wpm);
    console.log("roomId:", roomId);
    if (currentTime === 0 && mode === GAME_MODES.MULTIPLAYER && roomId) {
      syncResults(roomId, liveWpm, errors);
    }
    updateWpmGraph({y: Math.max(wpm, 0), x: duration - currentTime});
    updateErrorGraph({y: Math.max(errors, 0), x: duration - currentTime});
  }, [currentTime]);

  return {
    gameState,
    cursor,
    typed,
    currentTime,
    startGame,
    stopGame,
    liveWpm,
    errors
  };
}