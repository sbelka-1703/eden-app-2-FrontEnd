import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
        drawBorder: false,
      },
      ticks: { display: false },
    },
    xAxes: {
      grid: {
        color: "rgba(0, 0, 0, 0)",
        drawBorder: false,
        display: false,
      },
      ticks: { display: false },
    },
  },
};

export interface BarChartProps {
  data: number[];
  domain: number[];
  highlight: number[];
}

export const BarChart = ({ data, highlight, domain }: BarChartProps) => {
  const [barData, setBarData] = useState<ChartData<
    "bar",
    number[],
    unknown
  > | null>(null);

  useEffect(() => {
    const counts: any = {};

    for (let i = 0; i < data.length; i++)
      counts[data[i]] = counts[data[i]] + 1 || 1;

    const barDataValues = [];

    for (let i = 0; i < domain[1]; i++) {
      barDataValues.push(counts[i] || 0);
    }
    const barData = {
      labels: barDataValues.map((val, i) => i),
      datasets: [
        {
          backgroundColor: barDataValues.map((val, i) =>
            i >= highlight[0] && i <= highlight[1] ? "#74FA6D" : "#D9D9D9"
          ),
          hoverBackgroundColor: "#328b08",
          data: barDataValues,
        },
      ],
    };

    setBarData(barData);
  }, [data, domain, highlight]);

  if (!barData) return <div />;

  return <Bar data={barData} options={options} height={140} />;
};
