import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextArea from "./TextArea";

export default {
  title: "Elements/TextArea",
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "textfield",
  required: false,
  row: 8,
  placeholder: "Start typing here",
};
