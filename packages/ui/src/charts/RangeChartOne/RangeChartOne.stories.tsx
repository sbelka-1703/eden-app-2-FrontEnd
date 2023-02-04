import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RangeChartOne } from "./RangeChartOne";

export default {
  title: "Charts/RangeChartOne",
  component: RangeChartOne,
  argTypes: {},
} as ComponentMeta<typeof RangeChartOne>;

const Template: ComponentStory<typeof RangeChartOne> = (args) => {
  return (
    <div className="max-w-xs">
      <RangeChartOne {...args} />
    </div>
  );
};

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

export const Default = Template.bind({});
Default.args = {
  data: rangeNumbers,
  minCaption: "min salary",
  rightCaption: "max salary",
  onChange: (data) => console.info(data),
};
