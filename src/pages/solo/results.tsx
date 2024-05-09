import {useStore} from "../../store";
import {useEffect, useState} from "react";
import {calculateWPM} from "../../utils";
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme} from "victory";

interface Props {
  duration: number;
}

export default function Results({duration}: Props) {
  const {
    errors,
    typedParagraph,
    wpmGraph
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
    // if (accessToken === null) {
    // let history = localStorage.getItem('_history');
    // if (history === null || history === undefined) history = [];
    // else history = JSON.parse(history);
    // history.push({
    //   wpm, accuracy, mode: 'solo', errors, duration, timestamp: Date.now()
    // });
    // localStorage.setItem('_history', JSON.stringify(history));
    // } else {
    // const username = account.username;
    // const item = Date.now();
    // const history = {
    //   wpm,
    //   accuracy,
    //   mode: 'solo',
    //   errors, duration,
    //   timestamp: `${new Date(item).toLocaleTimeString()}\n ${new Date(item).toLocaleDateString()}`};
    // axios
    //   .post("http://localhost:3000/user/saveHistory", {username, history})
    //   .then(({data}) => {
    //     console.log(data);
    //   })
    // }
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col justify-start items-center">
      <div className="p-4 d container max-w-7xl rounded-lg gap-x-8 dark:bg-gray-700 flex items-center">
        <div className="">
          <p className="text-lg">Accuracy</p>
          <p className="text-5xl font-bold text-nord10">{result.accuracy > 0 ? result.accuracy.toFixed(0) : 0}%</p>
          <br/>
          <p className="text-2xl">wpm</p>
          <p className="text-5xl font-bold text-nord10">{result.wpm.toFixed(0)}</p>
          <br/>
        </div>
        <div className="">
          <VictoryChart width={1300} height={300}>
            <VictoryAxis
              style={{
                axis: {
                  stroke: "#8c8c8c",
                  strokeWidth: 0.2
                },
                grid: {
                  stroke: "#8c8c8c",
                  strokeWidth: 0.2
                }
              }}
              label="time (s)"
              // tickValues={wpmGraph.map(p => p.x)} axisLabelComponent={<VictoryLabel dy={25}/>}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {
                  stroke: "#8c8c8c",
                  strokeWidth: 0.2
                },
                grid: {
                  stroke: "#8c8c8c",
                  strokeWidth: 0.2
                }
              }}
              label="words per min"
              axisLabelComponent={<VictoryLabel dy={-25}/>}
            />
            <VictoryLine
              style={{
                data: {stroke: "#3f83f8"},
              }}
              data={wpmGraph}
              interpolation="natural"
            />
            {/*<VictoryScatter*/}
            {/*	style={{data: {fill: "#f00"}}}*/}
            {/*	size={3}*/}
            {/*	data={errorPoints}*/}
            {/*	symbol='triangleDown'*/}
            {/*/>*/}
          </VictoryChart>
        </div>
      </div>
      <button className="px-6 py-2 bg-blue-500 rounded-lg text-white"
              onClick={() => window.location.reload()}>Restart
      </button>
    </div>
  );
}