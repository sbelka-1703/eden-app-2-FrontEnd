import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ApplyByRoleModal } from "./ApplyByRoleModal";

export default {
  title: "Archive/Modals/ApplyByRoleModal",
  component: ApplyByRoleModal,
  argTypes: {},
} as ComponentMeta<typeof ApplyByRoleModal>;

const Template: ComponentStory<typeof ApplyByRoleModal> = (args) => (
  <ApplyByRoleModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
};
