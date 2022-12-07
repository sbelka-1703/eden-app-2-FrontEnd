import { RangeChart, TextHeading3 } from "@eden/package-ui";

export interface SalaryRangeChartProps {
  data: number[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const SalaryRangeChart = ({ data, onChange }: SalaryRangeChartProps) => {
  return (
    <div>
      <TextHeading3 className="mb-3 text-center">
        Hourly salary range
      </TextHeading3>
      <RangeChart
        data={data}
        onChange={onChange}
        minCaption="min salary"
        maxCaption="max salary"
      />
    </div>
  );
};
