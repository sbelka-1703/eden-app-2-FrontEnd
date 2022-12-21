// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LabelList,
// } from "recharts";
import { SkillsPercentage } from "@eden/package-graphql/generated";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

export interface IChartsProps {
  data: Array<SkillsPercentage> | any;
  color?: string;
  title?: string;
  width?: number;
  height?: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const CustomizedLabel: FunctionComponent<any> = (props: any) => {
//   const { x, y, value } = props;

//   return (
//     <text
//       x={x}
//       y={y}
//       dy={-15}
//       fill={"#FF7E5C"}
//       fontSize={10}
//       style={{ fontWeight: "bold" }}
//       textAnchor="middle"
//     >
//       {value} %
//     </text>
//   );
// };

// const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
//   const { x, y, payload } = props;

//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={10}
//         textAnchor="end"
//         fill="#FF7E5C"
//         transform="rotate(-50)"
//       >
//         {payload.value}
//       </text>
//     </g>
//   );
// };

export const Charts = ({ data, title, color, width, height }: IChartsProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartData = (propData: Array<SkillsPercentage>) => {
    const labels = propData?.map((data: any) => {
      return data.info.name;
    });

    const dataValue = propData?.map((data: any) => {
      return data.percentage100;
    });

    const chartD = {
      labels: labels,
      datasets: [
        {
          label: "Match Percentage",
          data: dataValue,
          borderColor: color,
          backgroundColor: color,
        },
      ],
    };

    return chartD;
  };

  return (
    // <LineChart
    //   width={700}
    //   height={300}
    //   data={data}
    //   margin={{
    //     top: 20,
    //     right: 30,
    //     left: 20,
    //     bottom: 10,
    //   }}
    // >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
    //   <YAxis />
    //   <Tooltip />
    //   <Legend />
    //   <Line type="monotone" dataKey="percentage" stroke="#8884d8">
    //     <LabelList content={<CustomizedLabel />} />
    //   </Line>
    // </LineChart>
    <>
      <Line
        options={options}
        data={chartData(data!)}
        width={width}
        height={height}
      />
    </>
  );
};
