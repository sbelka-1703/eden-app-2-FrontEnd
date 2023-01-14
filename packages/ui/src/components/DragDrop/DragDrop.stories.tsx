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
  elements: [
    {
      id: "1",
      content: "alpha",
    },
    {
      id: "2",
      content: "beta",
    },
    {
      id: "3",
      content: "discord",
    },
    {
      id: "4",
      content: "eden",
    },
  ],
};
