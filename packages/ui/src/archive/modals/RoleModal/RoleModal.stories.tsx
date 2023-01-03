import { findRoleTemplates } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleModal } from "./RoleModal";

export default {
  title: "Archive/Modals/RoleModal",
  component: RoleModal,
  argTypes: {},
} as ComponentMeta<typeof RoleModal>;

const Template: ComponentStory<typeof RoleModal> = (args) => (
  <RoleModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles: findRoleTemplates,
  openModal: true,
  firstRoleAssigned: false,
  onSubmit: (role) => {
    console.log(role);
  },
};
