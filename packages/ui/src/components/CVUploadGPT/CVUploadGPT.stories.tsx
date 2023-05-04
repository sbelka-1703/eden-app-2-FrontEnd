import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CVUploadGPT } from "./CVUploadGPT";

export default {
  title: "Components/CVUploadGPT",
  component: CVUploadGPT,
  argTypes: {},
} as ComponentMeta<typeof CVUploadGPT>;

const Template: ComponentStory<typeof CVUploadGPT> = (args) => (
  <CVUploadGPT {...args} />
);

export const Default = Template.bind({});
Default.args = {
  timePerWeek: 10,
  // seed: 1700,
};
