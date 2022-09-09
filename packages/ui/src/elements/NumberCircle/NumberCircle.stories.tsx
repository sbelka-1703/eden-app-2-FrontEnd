import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NumberCircle } from "./NumberCircle";

export default {
  title: "Elements/NumberCircle",
  component: NumberCircle,
  argTypes: {},
} as ComponentMeta<typeof NumberCircle>;

const Template: ComponentStory<typeof NumberCircle> = (args) => (
  <NumberCircle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 7,
};
