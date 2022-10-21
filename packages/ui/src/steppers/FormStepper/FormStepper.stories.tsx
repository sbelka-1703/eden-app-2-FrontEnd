import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FormStepper } from "./FormStepper";

export default {
  title: "Steppers/FormStepper",
  component: FormStepper,
  argTypes: {},
} as ComponentMeta<typeof FormStepper>;

const Template: ComponentStory<typeof FormStepper> = (args) => (
  <FormStepper {...args} />
);

export const Default = Template.bind({});

Default.args = {
  currentStep: 3,
  numberofSteps: 6,
};
