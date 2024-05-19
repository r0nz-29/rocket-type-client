import {DURATIONS, useStore,} from "../../store";
import {gradient} from "../../utils";

export default function DurationSelector() {
  const {activeDuration, setActiveDuration} = useStore();
  return (
    <div className="grid grid-cols-3 mb-6 dark:text-nord6 justify-between items-center py-1 px-2 text-sm text-white rounded-full">
      {DURATIONS.map(duration => (
        <div key={duration}
             className={`rounded-full cursor-pointer py-2 px-6  ${duration === activeDuration ? `text-white ${gradient} rounded-full text-md font-medium` : 'dark:text-nord6 text-nord3'}`}
             onClick={() => setActiveDuration(duration)}
        >
          <p className='font-bold text-lg'>{duration}s</p>
        </div>
      ))}
    </div>
  )
}