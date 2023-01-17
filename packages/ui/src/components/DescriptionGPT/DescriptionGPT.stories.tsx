import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DescriptionGPT } from "./DescriptionGPT";
export default {
  title: "Components/DescriptionGPT",
  component: DescriptionGPT,
  argTypes: {},
} as ComponentMeta<typeof DescriptionGPT>;

const Template: ComponentStory<typeof DescriptionGPT> = (args) => (
  <DescriptionGPT {...args} />
);

export const Default = Template.bind({});
Default.args = {};
