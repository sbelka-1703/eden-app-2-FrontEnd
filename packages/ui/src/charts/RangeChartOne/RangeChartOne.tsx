import {
  RangeSliderTwoPoint,
  SwitchButton,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import React from "react";
// eslint-disable-next-line no-duplicate-imports
import { useEffect, useState } from "react";

import { BarChartOne } from "./BarChartOne";

export interface RangeChartOneProps {
  data: number[];
  minCaption?: string;
  maxCaption?: string;
  leftCaption?: string;
  rightCaption?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

interface State {
  unpaid: boolean;
  usdc: boolean;
  tokenEquivalent: boolean;
}

const initialState: State = {
  unpaid: false,
  usdc: false,
  tokenEquivalent: false,
};

export const RangeChartOne = ({
  data,
  onChange,
  minCaption,
  maxCaption,
  leftCaption,
  rightCaption,
}: RangeChartOneProps) => {
  const [rangesData, setRangesData] = useState<{
    domain: number[];
    update: number[];
    values: number[];
  }>({
    domain: [],
    update: [],
    values: [],
  });
  const [selectedState, setSelectedState] = React.useState(initialState);

  const handleChange = (value: string | undefined) => {
    const updatedState: State = {
      unpaid: false,
      usdc: false,
      tokenEquivalent: false,
    };

    switch (value) {
      case "unpaid":
        updatedState.unpaid = true;
        break;
      case "usdc":
        updatedState.usdc = true;
        break;
      case "tokenEquivalent":
        updatedState.tokenEquivalent = true;
        break;
      default:
        break;
    }
    setSelectedState(updatedState);
  };

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

  useEffect(() => {
    onChange && onChange(rangesData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangesData]);

  if (rangesData.domain.length === 0) return <div />;

  return (
    <div className="space-y-4">
      <div className="b relative ">
        <TextHeading3 className="absolute bottom-0 left-0 -mt-6 -ml-2 py-4">
          <div className="flex flex-col items-center text-[16px] text-gray-500">
            <p>Min</p>
            {leftCaption || `$${rangesData.domain[0]} `}
          </div>
        </TextHeading3>
        <TextHeading3 className="absolute bottom-0 right-0 -mt-4 -mr-6 py-4 ">
          <div className="flex flex-col items-center text-[16px] text-gray-500">
            <p>Max</p>

            {leftCaption || `$${rangesData.domain[1]} `}
          </div>{" "}
        </TextHeading3>
        <BarChartOne
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
            label={minCaption}
            value={rangesData.update[0]}
            onChange={handleMinRange}
          />
        </div>
        <div className="w-32">
          <TextField
            type="number"
            label={maxCaption}
            className="text-center"
            min={rangesData.domain[0]}
            max={rangesData.domain[1]}
            value={rangesData.update[1]}
            onChange={handleMaxRange}
          />
        </div>
      </div>
      <div className="flex space-x-6 ">
        <SwitchButton
          labelOnTop={true}
          label={"Unpaid"}
          onChange={() => handleChange("unpaid")}
          value={selectedState.unpaid}
        />
        <SwitchButton
          labelOnTop={true}
          label={"$USDC"}
          onChange={() => handleChange("usdc")}
          value={selectedState.usdc}
        />
        <SwitchButton
          labelOnTop={true}
          label={"Token Equivalent"}
          onChange={() => handleChange("tokenEquivalent")}
          value={selectedState.tokenEquivalent}
        />
      </div>
    </div>
  );
};
