import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { findRoleTemplates } from "storybook/mocks";
import { RoleModal } from "./RoleModal";

export default {
  title: "Containers/RoleModal",
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
};
