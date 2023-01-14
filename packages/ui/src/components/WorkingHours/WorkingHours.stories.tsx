import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WorkingHours } from "./WorkingHours";

export default {
  title: "Components/WorkingHours",
  component: WorkingHours,
  argTypes: {},
} as ComponentMeta<typeof WorkingHours>;

const Template: ComponentStory<typeof WorkingHours> = (args) => (
  <WorkingHours {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "How many hours a week can you contribute?",
  minHour: "10",
  maxHour: "20",
  age: "35",
};
