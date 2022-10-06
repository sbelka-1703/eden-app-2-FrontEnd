import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SavingProjectModal } from "./SavingProjectModal";

export default {
  title: "Modals/SavingProjectModal",
  component: SavingProjectModal,
  argTypes: {},
} as ComponentMeta<typeof SavingProjectModal>;

const Template: ComponentStory<typeof SavingProjectModal> = (args) => (
  <SavingProjectModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
};
