import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WarningModal } from "./WarningModal";

export default {
  title: "Modals/WarningModal",
  component: WarningModal,
  argTypes: {},
} as ComponentMeta<typeof WarningModal>;

const Template: ComponentStory<typeof WarningModal> = (args) => (
  <WarningModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profilePercentage: 20,
  canProjectsSee: true,
  canSeeProjects: true,
  openModal: true,
  onSkip: () => null,
  onNext: () => null,
};
