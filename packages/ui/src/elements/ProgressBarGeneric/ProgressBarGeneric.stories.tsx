import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProgressBarGeneric from "./ProgressBarGeneric";

export default {
  title: "Elements/ProgressBarGeneric",
  component: ProgressBarGeneric,
  argTypes: {},
} as ComponentMeta<typeof ProgressBarGeneric>;

const Template: ComponentStory<typeof ProgressBarGeneric> = (args) => (
  <ProgressBarGeneric {...args} />
);

export const Default = Template.bind({});
Default.args = {
  progress: 50,
};
