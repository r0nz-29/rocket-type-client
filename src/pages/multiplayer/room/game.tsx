import {GAME_MODES, GAME_STATES, useStore} from "../../../store";
import {Spinner} from "@chakra-ui/react";
import useSocket from "../../../hooks/useSocket.ts";
import {useEffect} from "react";
import useGame from "../../../hooks/useGame.ts";
import MultiplayerResults from "./result.tsx";
import useDarkMode from "../../../hooks/useDarkMode.ts";

export default function MultiplayerGame() {
  const {paragraph, countdown, gameTimer, duration} = useStore(state => state.multiplayer);
  const {gameListeners} = useSocket();
  const {gameState} = useStore();
  const {darkMode} = useDarkMode();
  const {cursor, liveWpm, errors} = useGame(duration, GAME_MODES.MULTIPLAYER, darkMode);
  const isTyping = gameState === GAME_STATES.TYPING;

  useEffect(() => {
    gameListeners();
  }, []);

  if (!paragraph) return <Spinner/>;

  if (new Set([GAME_STATES.MULTIPLAYER.RESULTS, GAME_STATES.MULTIPLAYER.COMPLETED]).has(gameState)) return <MultiplayerResults/>;

  return (
    <div className="container max-w-7xl flex flex-col flex-1 justify-center">
      <p
        className={`text-2xl text-center w-full ${isTyping ? "inline-block" : "hidden"} text-nord0 font-black`}>{gameTimer}s</p>
      <br/>
      <p
        className={`transition-all ease-out text-nord1 text-center ${isTyping ? "text-2xl" : "hidden"}`}>
        current wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span>
      </p>
      <p className={`transition-all ease-out text-nord9 text-2xl text-center font-bold ${isTyping ? "hidden" : "inline-block"}`}>
        Starting in {countdown}s
      </p>
      <p
        className={`break-words text-xl w-full p-4 border border-slate-200 rounded-lg bg-white shadow ${isTyping ? "opacity-100" : "opacity-20"}`}
      >
        {paragraph.split("").map((char, i) => (
          <span key={i} id={`multi-char-at-${i}`}
                className={`highlight text-gray-500 font-light ${isTyping && i === cursor && "border-b-4 border-pink-500"}`}>
						{char}
					</span>
        ))}
      </p>
    </div>
  );
}