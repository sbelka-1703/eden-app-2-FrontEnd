import { RangeChart, TextHeading3 } from "@eden/package-ui";

export interface SalaryRangeChart_1Props {
  data: number[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: {
    domain: number[];
    update: number[];
    values: number[];
  }) => void;
}

export const SalaryRangeChartOne = ({
  data,
  onChange,
}: SalaryRangeChart_1Props) => {
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
