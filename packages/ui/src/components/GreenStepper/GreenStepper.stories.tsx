import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GreenStepper } from "./GreenStepper";

export default {
  title: "Components/GreenStepper",
  component: GreenStepper,
  argTypes: {},
} as ComponentMeta<typeof GreenStepper>;

const Template: ComponentStory<typeof GreenStepper> = (args) => (
  <GreenStepper {...args} />
);

export const Default = Template.bind({});
const steps = [
  {
    name: "step 1",
    completed: true,
  },
  {
    name: "step 2",
    completed: true,
  },
  {
    name: "step 3",
    completed: false,
  },
  {
    name: "step 4",
    completed: false,
  },
];

Default.args = {
  steps,
};
