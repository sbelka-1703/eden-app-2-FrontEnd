import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SwitchButton } from "./SwitchButton";

export default {
  title: "Elements/SwitchButton",
  component: SwitchButton,
  argTypes: {},
} as ComponentMeta<typeof SwitchButton>;

const Template: ComponentStory<typeof SwitchButton> = (args) => (
  <SwitchButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "label",
  name: "textfield",
};
