import {useStore} from "../../../store";
import {useEffect, useState} from "react";
import {calculateWPM, gradient} from "../../../utils";
import {Tooltip} from "@chakra-ui/react";
import ResultGraph from "./result-graph.tsx";

interface Props {
  duration: number;
}

export default function Results({duration}: Props) {
  const {
    errors,
    typedParagraph,
  } = useStore();

  const [result, setResult] = useState({
    wpm: 0,
    accuracy: 0,
    mode: "solo",
    errors: 0,
    duration: 0,
  });

  useEffect(() => {
    const wpm = calculateWPM(typedParagraph, errors, duration);
    const accuracy = 100 * ((typedParagraph.length - errors) / typedParagraph.length);
    setResult({
      wpm, accuracy, mode: "solo", errors, duration,
    });
  }, []);

  return (
    <div className="w-full container max-w-7xl flex-1 flex flex-col justify-start items-center">
      <div className="flex items-center w-full justify-evenly">
        <div className="">
          <p className="text-2xl">wpm</p>
          <Tooltip label={`${result.wpm.toFixed(2)}`} placement="bottom">
            <p className="text-5xl font-bold text-nord10">{Math.max(Math.trunc(result.wpm), 0)}</p>
          </Tooltip>
        </div>
        <div className="">
          <p className="text-lg">Accuracy</p>
          <Tooltip label={`${result.accuracy.toFixed(2)}%`} placement="bottom">
            <p className="text-5xl font-bold text-nord10">
              {Math.max(Math.trunc(result.accuracy), 0)}%
            </p>
          </Tooltip>
        </div>
        <button className={`rounded-full ${gradient} px-6 py-2 text-lg font-bold text-white`}
                onClick={() => window.location.reload()}>Restart
        </button>
      </div>
      <div className="w-full">
        <ResultGraph/>
      </div>
    </div>
  );
}