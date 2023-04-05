import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WizardStep } from "./WizardStep";

export default {
  title: "Components/WizardStep",
  component: WizardStep,
  argTypes: {},
} as ComponentMeta<typeof WizardStep>;

const Template: ComponentStory<typeof WizardStep> = (args) => (
  <WizardStep {...args} />
);

export const Default = Template.bind({});
Default.args = {};
