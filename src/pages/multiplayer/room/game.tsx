import {GAME_MODES, GAME_STATES, useStore} from "../../../store";
import {Spinner} from "@chakra-ui/react";
import useSocket from "../../../hooks/useSocket.ts";
import {useEffect} from "react";
import useGame from "../../../hooks/useGame.ts";
import MultiplayerResults from "./result.tsx";

export default function MultiplayerGame() {
  const {paragraph, countdown, gameTimer, duration} = useStore(state => state.multiplayer);
  const {gameListeners} = useSocket();
  const {gameState} = useStore();
  const {cursor, liveWpm, errors} = useGame(duration, GAME_MODES.MULTIPLAYER);


  useEffect(() => {
    gameListeners();
  }, []);

  // useEffect(() => {
  //   console.log(gameState, roomId);
  //   if (gameState !== GAME_STATES.MULTIPLAYER.COMPLETED || !roomId) return;
  //   syncResults(roomId, liveWpm, errors);
  // }, [gameState, roomId]);

  if (!paragraph) return <Spinner/>;

  if (new Set([GAME_STATES.MULTIPLAYER.RESULTS, GAME_STATES.MULTIPLAYER.COMPLETED]).has(gameState)) return <MultiplayerResults/>;

  return (
    <div className="container max-w-7xl flex flex-col flex-1 justify-center">
      <p className="text-2xl text-center w-full text-nord0 font-black">{gameTimer}s</p>
      <br/>
      <p
        className={`transition-all ease-out text-nord1 text-center ${gameState === GAME_STATES.TYPING ? "text-2xl" : "hidden"}`}>
        current wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span>
      </p>
      <p
        className={`transition-all ease-out text-nord9 text-2xl font-bold ${gameState === GAME_STATES.TYPING ? "hidden" : "inline-block"}`}>{countdown}s</p>
      <p className="break-all text-xl w-full p-4 border border-slate-200 rounded-lg bg-white shadow">
        {paragraph.split("").map((char, i) => (
          <span key={i} id={`multi-char-at-${i}`}
                className={`highlight text-gray-500 font-light ${gameState === GAME_STATES.TYPING && i === cursor && "border-b-4 border-pink-500"}`}>
						{char}
					</span>
        ))}
      </p>
    </div>
  );
}