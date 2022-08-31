import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FormStepper } from "./FormStepper";

export default {
  title: "Components/FormStepper",
  component: FormStepper,
  argTypes: {},
} as ComponentMeta<typeof FormStepper>;

const Template: ComponentStory<typeof FormStepper> = (args) => (
  <FormStepper {...args} />
);

export const Default = Template.bind({});
const steps = [
  {
    name: "1",
    completed: true,
  },
  {
    name: "2",
    completed: false,
  },
  {
    name: "3",
    completed: false,
  },
  {
    name: "4",
    completed: false,
  },
  {
    name: "5",
    completed: false,
  },
  {
    name: "6",
    completed: false,
  },
];

Default.args = {
  steps,
};
