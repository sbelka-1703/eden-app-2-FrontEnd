import { RangeSliderTwoPoint, TextField, TextHeading3 } from "@eden/package-ui";
import { useEffect, useState } from "react";

import { BarChart } from "./BarChart";

export interface SalaryRangeChartProps {
  data: number[];
}

export const SalaryRangeChart = ({ data }: SalaryRangeChartProps) => {
  const [rangesData, setRangesData] = useState<{
    domain: number[];
    update: number[];
    values: number[];
  }>({
    domain: [],
    update: [],
    values: [],
  });

  const handleMinRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    const newState = [value, rangesData.update[1]];

    setRangesData((prevState) => ({
      ...prevState,
      update: newState,
    }));

    if (value && +value >= rangesData.domain[0]) {
      setRangesData((prevState) => ({
        ...prevState,
        values: newState,
      }));
    }
  };

  const handleMaxRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const newState = [rangesData.update[0], value];

    setRangesData((prevState) => ({
      ...prevState,
      update: newState,
    }));

    if (
      value &&
      value <= rangesData.domain[1] &&
      value >= rangesData.values[0]
    ) {
      setRangesData((prevState) => ({
        ...prevState,
        values: newState,
      }));
    }
  };

  useEffect(() => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const range = [sortedData[0], sortedData[sortedData.length - 1]];

    setRangesData({
      domain: range,
      update: range,
      values: range,
    });
  }, [data]);

  if (rangesData.domain.length === 0) return <div />;

  return (
    <div>
      <div className="max-w-xs">
        <TextHeading3 className="mb-3 text-center">Salary range</TextHeading3>

        <div className="relative">
          <TextHeading3 className="absolute left-0 bottom-4">
            Less $
          </TextHeading3>
          <TextHeading3 className="absolute right-0 bottom-5">
            More $$
          </TextHeading3>
          <BarChart
            data={data}
            domain={rangesData.domain}
            highlight={rangesData.update}
          />
          <RangeSliderTwoPoint
            values={rangesData.values}
            domain={rangesData.domain}
            onUpdate={(update) => {
              setRangesData((prevState) => ({
                ...prevState,
                update: [...update],
              }));
            }}
            onChange={(values) =>
              setRangesData((prevState) => ({
                ...prevState,
                values: [...values],
              }))
            }
            rootStyle={{
              width: "100%",
              bottom: "10px",
              position: "absolute",
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-32">
            <TextField
              type="number"
              className="text-center"
              min={rangesData.domain[0]}
              max={rangesData.domain[1]}
              label="min salary"
              value={rangesData.update[0]}
              onChange={handleMinRange}
            />
          </div>
          <div className="mt-5 h-0.5 w-6 bg-gray-400" />
          <div className="w-32">
            <TextField
              type="number"
              label="max salary"
              className="text-center"
              min={rangesData.domain[0]}
              max={rangesData.domain[1]}
              value={rangesData.update[1]}
              onChange={handleMaxRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
