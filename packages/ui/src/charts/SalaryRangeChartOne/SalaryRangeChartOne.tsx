import { RangeChartOne, TextHeading3 } from "@eden/package-ui";

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
    <div className="space-y-4">
      <TextHeading3 className="mb-3 text-center">
        💸 Salary Expectations
      </TextHeading3>
      <RangeChartOne
        data={data}
        onChange={onChange}
        minCaption="min salary"
        maxCaption="max salary"
      />
    </div>
  );
};
