import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RangeChart } from "./RangeChart";

export default {
  title: "Charts/RangeChart",
  component: RangeChart,
  argTypes: {},
} as ComponentMeta<typeof RangeChart>;

const Template: ComponentStory<typeof RangeChart> = (args) => {
  return (
    <div className="max-w-xs">
      <RangeChart {...args} />
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
