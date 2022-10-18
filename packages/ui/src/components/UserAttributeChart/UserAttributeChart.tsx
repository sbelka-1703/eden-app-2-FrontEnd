import {
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { startCase } from "lodash";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type AttributesType = {
  experience: number;
  availability: number;
  skillMatch: number;
  accountability: number;
};

export interface ICompany {
  companyInfo: {
    discordName: string;
    attributes: AttributesType;
  };
}

export interface IUserAttributeChartProps {
  members: ICompany[];
}

const colors = ["#98FF87B0", "#E5ADFFB0", "#FF9BE9B0", "#A2EDFDB0"];

const options: ChartOptions<"radar"> = {
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
    r: {
      grid: {
        circular: true,
      },
      ticks: {
        display: false,
      },
      pointLabels: {
        centerPointLabels: true,
        padding: 18,
        color: "#000",
        font: {
          size: 18,
          weight: "700",
        },
      },
    },
  },
  elements: {
    // point: {
    //   radius: 0,
    // },
  },
};

export const UserAttributeChart = ({ members }: IUserAttributeChartProps) => {
  const labels = Object.keys(members[0].companyInfo.attributes).map((item) =>
    startCase(item)
  );
  const datasets = members.map(({ companyInfo }, i) => {
    return {
      label: companyInfo.discordName,
      data: Object.keys(companyInfo.attributes).map(
        (key) => companyInfo.attributes[key as keyof AttributesType]
      ),
      fill: true,
      borderWidth: 0,
      backgroundColor: colors[i],
    };
  });

  return (
    <Radar
      options={options}
      data={{
        labels,
        datasets,
      }}
    />
  );
};
