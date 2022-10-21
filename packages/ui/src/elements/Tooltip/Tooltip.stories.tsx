import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Tooltip } from "./Tooltip";

export default {
  title: "Elements/Tooltip",
  component: Tooltip,
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Tooltip",
};
