import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WizardStepsHeader } from "./WizardStepsHeader";

export default {
  title: "Components/WizardStepsHeader",
  component: WizardStepsHeader,
  argTypes: {},
} as ComponentMeta<typeof WizardStepsHeader>;

const Template: ComponentStory<typeof WizardStepsHeader> = (args) => (
  <WizardStepsHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
