import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProgressStepper } from "./ProgressStepper";

export default {
  title: "Steppers/ProgressStepper",
  component: ProgressStepper,
  argTypes: {},
} as ComponentMeta<typeof ProgressStepper>;

const Template: ComponentStory<typeof ProgressStepper> = (args) => (
  <ProgressStepper {...args} />
);

export const Default = Template.bind({});
const steps = [
  {
    name: "Applied",
    completed: true,
  },
  {
    name: "Application Reviewed",
    completed: true,
  },
  {
    name: "Application Shortlisted",
    completed: false,
  },
  {
    name: "Application Shortlisted",
    completed: false,
  },
];

Default.args = {
  steps,
};
