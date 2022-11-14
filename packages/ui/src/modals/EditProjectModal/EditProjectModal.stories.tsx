// import { findRoleTemplates } from "@eden/package-mock";
import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EditProjectModal } from "./EditProjectModal";

export default {
  title: "Modals/EditProjectModal",
  component: EditProjectModal,
  argTypes: {},
} as ComponentMeta<typeof EditProjectModal>;

const Template: ComponentStory<typeof EditProjectModal> = (args) => (
  <EditProjectModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showModal: true,
  project: getProject(),
};
