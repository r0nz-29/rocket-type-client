import Results from "../../solo/results";
import {useStore} from "../../../store";
import {Spinner} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import {wpmColor} from "../../solo/results/result-graph.tsx";

export default function MultiplayerResults() {
  const {duration} = useStore(state => state.multiplayer);
  return (
    <div className="container max-w-7xl flex-1 flex flex-col justify-center items-center">
      <MultiplayerGraph/>
      <p className="text-xl">
        See how you performed
      </p>
      <Results duration={duration}/>
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
        chart: {
          toolbar: {
            show: false
          }
        },
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