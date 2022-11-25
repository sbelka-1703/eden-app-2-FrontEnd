import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ColorPicker } from "./ColorPicker";

export default {
  title: "Elements/ColorPicker",
  component: ColorPicker,
  argTypes: {},
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => (
  <ColorPicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onChange: (color) => console.info({ color }),
};
