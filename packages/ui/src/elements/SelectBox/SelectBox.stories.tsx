import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SelectBox } from "./SelectBox";

export default {
  title: "Elements/SelectBox",
  component: SelectBox,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  caption: "Select item",
  items: [
    "Wade Cooper",
    "Arlene Mccoy",
    "Devon Webb",
    "Tom Cook",
    "Tanya Fox",
    "Hellen Schmidt",
  ],
};
