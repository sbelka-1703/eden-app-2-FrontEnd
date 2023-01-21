import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockNodes } from "./mockNodes";
import { SelectNodesBox } from "./SelectNodesBox";

export default {
  title: "Elements/SelectNodesBox",
  component: SelectNodesBox,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} as ComponentMeta<typeof SelectNodesBox>;

const Template: ComponentStory<typeof SelectNodesBox> = (args) => (
  <SelectNodesBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  caption: "Select item",
  items: mockNodes,
  multiple: true,
  btnBGcolor: "bg-gray-200",
  disabled: false,
};
