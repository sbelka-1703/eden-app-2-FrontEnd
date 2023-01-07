import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DragDrop } from "./DragDrop";

export default {
  title: "Components/DragDrop",
  component: DragDrop,
  argTypes: {},
} as ComponentMeta<typeof DragDrop>;

const Template: ComponentStory<typeof DragDrop> = (args) => (
  <DragDrop {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Drag and drop to be in ascending order",
  elements: ["alpha", "beta", "eden", "discord"],
};
