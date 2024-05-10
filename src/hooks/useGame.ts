import {GAME_MODES, GAME_STATES, SPECIAL_KEYS, useStore} from "../store";
import {useCallback, useEffect, useState} from "react";
import {calculateWPM} from "../utils";
import useTimer from "./useTimer.ts";
import {socket} from "../socket";

export default function useGame(duration: number, mode = GAME_MODES.SOLO) {
  const {currentTime} = useTimer(duration);
  const {
    typedParagraph: typed,
    cursorPosition: cursor,
    errors,
    gameState,
    incrementCursor,
    incrementErrors,
    lobbyParagraph,
    soloParagraph,
    updateGameState,
    updateTypedParagraph: updateParagraph,
    updateWpmGraph,
    updateErrorGraph
  } = useStore();

  let words = soloParagraph;
  if (mode === GAME_MODES.MULTIPLAYER) words = lobbyParagraph;

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
      const acc = 100 * ((typed.length - errors) / typed.length);
      const wpm = calculateWPM(typed, errors, duration - currentTime);
      socket.emit("new_wpm", {
        speed: wpm,
        pos: cursor,
        over: true,
        errors: errors,
        accuracy: acc > 0 ? acc : 0
      });
      console.log("sent");
    }
  }, [gameState]);

  useEffect(() => {
    if (cursor === words.length) {
      updateGameState(GAME_STATES.COMPLETED);
    }
  }, [cursor, updateGameState, words, words.length]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (gameState === GAME_STATES.IDLE || gameState === GAME_STATES.COMPLETED || SPECIAL_KEYS.has(e.key)) return;

    const char = document.getElementById(`char-at-${cursor}`);
    if (!char) return;

    if (e.key !== words[cursor]) {
      char.style.color = "#f00";
      char.style.fontWeight = "bold";
      incrementErrors();
      return;
    } else {
      char.style.color = "#000";
      char.style.fontWeight = "bold";
    }

    updateParagraph(e.key);
    incrementCursor();
  }, [gameState, words, cursor, incrementErrors]);

  useEffect(() => {
    if (gameState === GAME_STATES.IDLE) return;

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameState, handleKeydown]);

  useEffect(() => {
    if (currentTime < 0 || gameState !== GAME_STATES.TYPING) return;
    const wpm = calculateWPM(typed, errors, duration - currentTime);

    if (mode === GAME_MODES.MULTIPLAYER) {
      const acc = 100 * ((typed.length - errors) / typed.length);
      socket.emit("new_wpm", {
        speed: wpm,
        pos: cursor,
        over: false,
        errors: errors,
        accuracy: acc > 0 ? acc : 0
      });
    } else {
      setLiveWpm(wpm);
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