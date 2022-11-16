import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TimelineStepper } from "./TimelineStepper";

export default {
  title: "Steppers/TimelineStepper",
  component: TimelineStepper,
  argTypes: {},
} as ComponentMeta<typeof TimelineStepper>;

const Template: ComponentStory<typeof TimelineStepper> = (args) => (
  <TimelineStepper {...args} />
);

export const Default = Template.bind({});
const steps = [
  {
    completed: false,
    date: "APR 21 - JAN 22",
    description: "Launch beta of the platform.",
  },
  {
    completed: false,
    date: "JAN 22 - MAR 22",
    description: "Launch alpha of the platform. Pre-seed: 1 Mil",
  },
  {
    completed: true,
    date: "MAR 22 - JAN 23",
    description: "Launch a native token Seed: 4 Mil",
  },
  {
    completed: false,
    date: "JAN 23 - JAN 24",
    description: "Onboard 5k new devs. Generate first revenue",
  },
];

Default.args = {
  steps,
};
