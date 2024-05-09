import {useEffect} from "react";
import {DIFFICULTIES, useStore} from "../../store";

export default function DifficultySelector() {
  const {soloDifficulty, setSoloDifficulty} = useStore();

  useEffect(() => {
    // const para = dataset[soloDifficulty][0];
    // setSoloPara(para);
  }, [soloDifficulty])

  return (
    <div className="grid grid-cols-3 justify-between items-center py-1 px-2 text-sm text-white rounded-full">
      {Object.keys(DIFFICULTIES).map(diff => (
        <div key={diff}
             className={`rounded-full cursor-pointer py-2 px-6 ${DIFFICULTIES[diff as keyof typeof DIFFICULTIES] === soloDifficulty ? 'text-white bg-gradient-to-tl from-blue-500 via-violet-500 to-red-400 rounded-full text-md font-medium' : 'text-nord3'}`}
             onClick={() => setSoloDifficulty(DIFFICULTIES[diff as keyof typeof DIFFICULTIES])}
        >
          <p className='text-center font-bold text-lg'>{diff}</p>
        </div>
      ))}
    </div>
  )
}