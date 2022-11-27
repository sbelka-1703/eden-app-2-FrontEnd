import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockNodes } from "./mockNodes";
import { SelectBoxNode } from "./SelectBoxNode";

export default {
  title: "Elements/SelectBoxNode",
  component: SelectBoxNode,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} as ComponentMeta<typeof SelectBoxNode>;

const Template: ComponentStory<typeof SelectBoxNode> = (args) => (
  <SelectBoxNode {...args} />
);

export const Default = Template.bind({});

Default.args = {
  caption: "Select item",
  items: mockNodes,
  multiple: true,
  btnBGcolor: "bg-gray-200",
  disabled: false,
};
