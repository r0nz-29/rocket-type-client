import {GAME_STATES, useStore} from "../../store";
import useGame from "../../hooks/useGame.ts";
import DurationSelector from "./select-duration.tsx";
import Results from "./results";
import {gradient} from "../../utils";

export default function SoloTest() {
  const {soloParagraph: words, activeDuration} = useStore();
  const {gameState, currentTime, cursor, startGame, liveWpm, errors} = useGame(activeDuration);

  if (gameState === GAME_STATES.COMPLETED) return <Results duration={activeDuration}/>;

  return (
    <div className="w-full flex-1 flex flex-col justify-start items-center">
      <div
        className={`transition-all ease-out delay-75 ${gameState === GAME_STATES.TYPING ? "my-0" : "my-32"} mb-2 ${gameState === GAME_STATES.TYPING ? "opacity-0" : "opacity-100"}`}>
        <DurationSelector/>
      </div>
      {/*<div className={`mb-16 mt-2 transition-all ${gameState === GAME_STATES.TYPING ? "opacity-0" : "opacity-100"}`}>*/}
      {/*  <DifficultySelector/>*/}
      {/*</div>*/}
      <p className={`transition-all ease-out text-nord1 ${gameState === GAME_STATES.TYPING ? "text-2xl" : "hidden"}`}>
        current wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span></p>
      <p
        className={`justify-start w-1/2 text-xl mb-4 ${gameState === GAME_STATES.TYPING ? "text-nord10" : "text-[#333]"}`}>
        {currentTime}s
      </p>
      <div className="w-1/2 h-fit">
        <p className="break-words text-xl w-full p-4 border border-slate-200 rounded-lg bg-white shadow">
          {words.split("").map((char, i) => (
            <span key={i} id={`char-at-${i}`}
                  className={`highlight text-gray-500 font-light ${gameState === GAME_STATES.TYPING && i === cursor && "border-b-4 border-pink-500"}`}>
						{char}
					</span>
          ))}
        </p>
      </div>
      <button
        disabled={gameState === GAME_STATES.TYPING}
        className={`transition-all text-white ${gameState === GAME_STATES.IDLE ? `opacity-100 ${gradient}` : "opacity-0 hover:text-gray-200 bg-zinc-800 border border-zinc-700"} rounded-full px-6 py-2 text-lg font-bold mt-8`}
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}