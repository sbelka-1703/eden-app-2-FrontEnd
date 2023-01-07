import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextField from "./TextField";

export default {
  title: "Elements/TextField",
  component: TextField,
  argTypes: {},
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "textfield",
  label: "label",
  type: "text",
  required: false,
  placeholder: "placeholder",
};
