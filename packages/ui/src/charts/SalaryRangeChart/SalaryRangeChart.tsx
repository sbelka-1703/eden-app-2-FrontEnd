import { RangeChart, TextHeading3 } from "@eden/package-ui";

export interface SalaryRangeChartProps {
  data: number[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
  minDefaultValue?: number;
  maxDefaultValue?: number;
  showTitle?: boolean;
}

export const SalaryRangeChart = ({
  data,
  onChange,
  minDefaultValue,
  maxDefaultValue,
  showTitle = true,
}: SalaryRangeChartProps) => {
  return (
    <div>
      {showTitle && (
        <TextHeading3 className="mb-3 text-center">
          Hourly salary range
        </TextHeading3>
      )}
      <RangeChart
        data={data}
        onChange={onChange}
        minCaption="min salary"
        maxCaption="max salary"
        minDefaultValue={minDefaultValue}
        maxDefaultValue={maxDefaultValue}
      />
    </div>
  );
};
