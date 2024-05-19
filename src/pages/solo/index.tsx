import {GAME_MODES, GAME_STATES, useStore} from "../../store";
import useGame from "../../hooks/useGame.ts";
import DurationSelector from "./select-duration.tsx";
import Results from "./results";
import {gradient} from "../../utils";
import useDarkMode from "../../hooks/useDarkMode.ts";

export default function SoloTest() {
  const {soloParagraph: words, activeDuration} = useStore();
  const {darkMode} = useDarkMode();
  const {gameState, currentTime, cursor, startGame, liveWpm, errors} = useGame(activeDuration, GAME_MODES.SOLO, darkMode);
  const isTyping = gameState === GAME_STATES.TYPING;

  if (gameState === GAME_STATES.COMPLETED) return <Results duration={activeDuration}/>;
  return (
    <div className="w-full container max-w-7xl flex-1 dark:text-nord6 flex flex-col justify-start items-center">
      <div
        className={`transition-all ease-out delay-75 ${isTyping ? "my-0" : "my-32"} mb-2 ${isTyping ? "opacity-0" : "opacity-100"}`}>
        <DurationSelector/>
      </div>
      <p
        className={`text-3xl font-black mb-4 ${isTyping ? "text-nord10" : "hidden"}`}>
        {currentTime}s
      </p>
      <p className={`transition-all ease-out text-nord1 ${isTyping ? "text-2xl" : "hidden"}`}>
        current wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span></p>
      <div className="w-full h-fit mt-8">
        <p className="break-words text-xl w-full p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-nord1 shadow">
          {words.split("").map((char, i) => (
            <span key={i} id={`char-at-${i}`}
                  className={`highlight text-gray-500 font-light ${isTyping && i === cursor && "border-b-4 border-pink-500"}`}>
						{char}
					</span>
          ))}
        </p>
      </div>
      <button
        disabled={isTyping}
        className={`transition-all text-white ${gameState === GAME_STATES.IDLE ? `opacity-100 ${gradient}` : "opacity-0 hover:text-gray-200 bg-zinc-800 border border-zinc-700"} rounded-full px-6 py-2 text-lg font-bold mt-8`}
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}