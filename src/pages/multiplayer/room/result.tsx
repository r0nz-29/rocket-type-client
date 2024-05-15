import Results from "../../solo/results";
import {GAME_MODES, useStore} from "../../../store";
import {Spinner} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import {wpmColor} from "../../solo/results/result-graph.tsx";
import {gradient} from "../../../utils";

export default function MultiplayerResults() {
  const {duration} = useStore(state => state.multiplayer);
  return (
    <div className="container max-w-7xl flex-1 flex flex-col justify-center items-center">
      <div className="flex items-center justify-center">
        <MultiplayerGraph/>
        <button
          className={`rounded-full ${gradient} px-6 py-2 text-lg font-bold text-white`}
          onClick={() => window.location.reload()}>
          Restart
        </button>
      </div>
      <p className="text-xl">
        See how you performed
      </p>
      <Results duration={duration} mode={GAME_MODES.MULTIPLAYER}/>
    </div>
  );
}

function MultiplayerGraph() {
  const {resultGraph} = useStore(state => state.multiplayer);

  if (!resultGraph) return (
    <div className="text-center flex flex-col justify-center items-center">
      <Spinner/>
      <p>Loading collective results</p>
    </div>
  );

  return (
    <Chart
      type="bar"
      height="50%"
      width="100%"
      series={[
        {name: "wpm", data: resultGraph.map(r => parseFloat(r.wpm.toFixed(2)))}
      ]}
      options={{
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: resultGraph.map(r => r.username),
          labels: {
            style: {
              fontFamily: "JetBrains Mono"
            }
          }
        },
        colors: [wpmColor],
        yaxis: {
          title: {
            text: "wpm",
            style: {
              fontFamily: "JetBrains Mono"
            }
          }
        },
      }}
    />
  );
}