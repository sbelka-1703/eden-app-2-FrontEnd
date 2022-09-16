import { ComponentMeta, ComponentStory } from "@storybook/react";

import CheckBox from "./CheckBox";

export default {
  title: "Elements/CheckBox",
  component: CheckBox,
  argTypes: {},
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "label",
  name: "textfield",
  type: "text",
  required: false,
  placeholder: "placeholder",
};
