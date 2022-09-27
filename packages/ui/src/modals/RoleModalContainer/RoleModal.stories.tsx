import { ComponentMeta, ComponentStory } from "@storybook/react";
import { findRoleTemplates } from "storybook/mocks";

import { RoleModal } from "./RoleModal";

export default {
  title: "Modals/RoleModal",
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
