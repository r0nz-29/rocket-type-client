import Chart from "react-apexcharts";
import {useStore} from "../../../store";

export default function ResultGraph() {
  const {wpmGraph, errorGraph} = useStore();
  const wpmSeries = wpmGraph.map(p => ({x: Math.trunc(p.x), y: p.y.toFixed(2)}));
  const errorSeries = errorGraph.map(p => ({x: Math.trunc(p.x), y: Math.trunc(p.y)}));
  const wpmColor = "#5E81AC";
  const errorColor = "#BF616A";
  return (
    <Chart
      type="area"
      series={[
        {data: wpmSeries, name: "wpm", color: wpmColor, type: "area"},
        {data: errorSeries, name: "errors", color: errorColor, type: "area"}
      ]}
      width="100%"
      height={400}
      options={{
        xaxis: {
          type: "numeric",
          labels: {
            style: {
              fontFamily: "JetBrains Mono",
            }
          },
          title: {
            text: "time (s)",
            style: {
              fontFamily: "JetBrains Mono"
            }
          },
        },
        yaxis: [
          {
            labels: {
              style: {
                fontFamily: "JetBrains Mono",
              }
            },
            title: {
              text: "words per minute",
              style: {
                fontFamily: "JetBrains Mono"
              }
            }
          },
          {
            opposite: true,
            labels: {
              style: {
                fontFamily: "JetBrains Mono",
              }
            },
            title: {
              text: "errors",
              style: {
                fontFamily: "JetBrains Mono"
              }
            }
          }
        ],
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 5,
          colors: ["#fff"],
          strokeColors: [wpmColor, errorColor],
          strokeWidth: 3
        },
        stroke: {
          curve: "smooth",
          colors: [wpmColor, errorColor]
        },
        fill: {
          colors: [wpmColor, errorColor]
        },
        grid: {
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        chart: {
          toolbar: {
            show: false,
          }
        }
      }}
    />
  );
}