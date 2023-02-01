import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
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

const options = {
  responsive: true,
  maintainAspectRatio: true,
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
  barPercentage: 1,
  categoryPercentage: 0.7,
};

export interface BarChartOneProps {
  data: number[];
  domain: number[];
  highlight: number[];
}

export const BarChartOne = ({ data, highlight, domain }: BarChartOneProps) => {
  const [barDataOne, setBarDataOne] = useState<ChartData<
    "bar",
    number[],
    unknown
  > | null>(null);

  useEffect(() => {
    const counts: any = {};

    for (let i = 0; i < data.length; i++)
      counts[data[i]] = counts[data[i]] + 1 || 1;

    const barDataOneValues = [];

    for (let i = 0; i < domain[1]; i++) {
      barDataOneValues.push(counts[i] || 0);
    }
    const barDataOne = {
      labels: barDataOneValues.map((val, i) => i),
      datasets: [
        {
          backgroundColor: barDataOneValues.map((val, i) =>
            i >= highlight[0] && i <= highlight[1] ? "#74FA6D" : "#D9D9D9"
          ),
          hoverBackgroundColor: "#328b08",
          data: barDataOneValues,
          barThickness: 6,
        },
      ],
    };

    setBarDataOne(barDataOne);
  }, [data, domain, highlight]);

  if (!barDataOne) return <div />;

  return <Bar data={barDataOne} options={options} height={100} />;
};
