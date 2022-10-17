import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RangeSliderTwoPoint } from "./RangeSliderTwoPoint";

export default {
  title: "Elements/RangeSliderTwoPoint",
  component: RangeSliderTwoPoint,
  argTypes: {},
} as ComponentMeta<typeof RangeSliderTwoPoint>;

const Template: ComponentStory<typeof RangeSliderTwoPoint> = (args) => (
  <div className="max-w-sm">
    <RangeSliderTwoPoint {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  domain: [1, 2],
  values: [1, 2, 3],
  rootStyle: { width: "100%", position: "relative" },
};
