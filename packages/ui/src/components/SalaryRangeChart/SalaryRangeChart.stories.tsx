import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SalaryRangeChart } from "./SalaryRangeChart";

export default {
  title: "Components/SalaryRangeChart",
  component: SalaryRangeChart,
  argTypes: {},
} as ComponentMeta<typeof SalaryRangeChart>;

const Template: ComponentStory<typeof SalaryRangeChart> = (args) => {
  return <SalaryRangeChart {...args} />;
};

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export const Default = Template.bind({});
Default.args = {
  data: rangeNumbers,
};
