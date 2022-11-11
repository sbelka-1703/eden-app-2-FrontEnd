import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkipFlowModal } from "./SkipFlowModal";

export default {
  title: "Modals/SkipFlowModal",
  component: SkipFlowModal,
  argTypes: {},
} as ComponentMeta<typeof SkipFlowModal>;

const Template: ComponentStory<typeof SkipFlowModal> = (args) => (
  <SkipFlowModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  percentage: 50,
  onSkipStep: () => null,
  onSkipFlow: () => null,
};
