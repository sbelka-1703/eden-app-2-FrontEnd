import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SalaryRangeChartOne } from "./SalaryRangeChartOne";

export default {
  title: "Charts/SalaryRangeChartOne",
  component: SalaryRangeChartOne,
  argTypes: {},
} as ComponentMeta<typeof SalaryRangeChartOne>;

const Template: ComponentStory<typeof SalaryRangeChartOne> = (args) => {
  return (
    <div className="max-w-xs">
      <SalaryRangeChartOne {...args} />
    </div>
  );
};

const rangeNumbers: number[] = [
  46, 108, 75, 57, 122, 51, 45, 95, 46, 39, 64, 80, 40, 53, 35, 69, 99, 47, 69,
  66, 95, 53, 71, 69, 107, 70, 70, 59, 120, 69, 125, 48, 81, 60, 50, 40, 41, 69,
  76, 112, 82, 98, 45, 40, 87, 55, 92, 70, 58, 103, 13, 71, 39, 79, 92, 44, 88,
  45, 106, 121, 71, 72, 54, 79, 77, 103, 82, 80, 49, 70, 42, 75, 93, 68, 127,
  50, 58, 101, 76, 55, 93, 77, 42, 89, 42, 93, 68, 54, 37, 88, 78, 92, 106, 102,
  114, 88, 30, 56, 84, 58, 40, 98, 101, 60, 62, 51, 72, 52, 116, 68, 92, 115,
  104, 74, 100, 45, 49, 84, 114, 96, 73, 101, 75, 37, 63, 74, 126, 50, 80, 52,
  90, 49, 50, 97, 81, 107, 72, 61, 90, 37, 56, 37, 121, 49, 50, 102, 96, 57, 61,
  136, 101, 85, 93, 73, 70, 124, 90, 14, 64, 65, 107, 45, 69, 81, 35, 30, 62,
  61, 45, 47, 95, 83, 122, 59, 88, 105, 87, 89, 94, 63, 90, 47, 48, 36, 46, 79,
  111, 60, 94, 35, 53, 109, 43, 51, 114, 69, 67, 50, 128, 35, 67, 92, 81, 11,
  84, 69, 96, 99, 79, 61, 36, 83, 100, 30, 74, 64, 79, 121, 69, 96, 95, 127, 84,
  81, 90, 60, 89, 75, 128, 116, 54, 43, 65, 56, 66, 66, 62, 60, 80, 55, 38, 122,
  23, 13, 84, 60, 48, 89, 52, 85, 111, 78, 49, 26, 105, 90, 40, 120, 72, 58, 73,
  29, 38, 28, 66, 49, 98, 72, 91, 88, 102, 37, 43, 79, 104, 97, 97, 43, 68, 80,
  22, 79, 76, 70, 83, 115, 94, 56, 61, 83, 110, 100, 64, 107, 45, 85, 53, 127,
  63, 74, 84, 69, 75, 63, 79, 69, 89, 118, 77, 44, 83, 56, 39, 88, 118, 76, 83,
  95, 55, 70, 59, 78, 88, 77, 89, 63, 121, 115, 56, 97, 107, 81, 97, 74, 51, 79,
  118, 82, 79, 104, 71, 60, 85, 77, 90, 128, 1,
];

console.log("rangeNumbers", rangeNumbers);
// const arrayLength = 300;

// const array: number[] = Array.from({ length: arrayLength }, () =>
//   Math.floor(Math.random() * (200  30 + 1) + 30)
// );

console.log();

// for (let i = 0; i < 400; i++) {
//   rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
// }

export const Default = Template.bind({});
Default.args = {
  data: rangeNumbers,
  onChange: (data) => console.info(data),
};
