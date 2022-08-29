import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProgressBar from "./ProgressBar";

export default {
  title: "Elements/ProgressBar",
  component: ProgressBar,
  argTypes: {},
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  totalDays: 100,
  currentDayCount: 45,
};
