import { ComponentMeta, ComponentStory } from "@storybook/react";

import RangeSlider from "./RangeSlider";

export default {
  title: "Elements/RangeSlider",
  component: RangeSlider,
  argTypes: {},
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => (
  <RangeSlider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  required: false,
  defaultValue: 50,
  onChange: (val) => console.info({ val }),
};
