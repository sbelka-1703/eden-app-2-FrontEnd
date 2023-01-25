import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectNodes } from "./SelectNodes";

export default {
  title: "Elements/SelectNodes",
  component: SelectNodes,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} as ComponentMeta<typeof SelectNodes>;

const Template: ComponentStory<typeof SelectNodes> = (args) => (
  <SelectNodes {...args} />
);

export const Default = Template.bind({});

Default.args = {
  nodeType: "expertise",
};
