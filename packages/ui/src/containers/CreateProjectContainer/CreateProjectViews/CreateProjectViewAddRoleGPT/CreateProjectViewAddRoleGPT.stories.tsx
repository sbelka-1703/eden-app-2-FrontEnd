import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViewAddRoleGPT } from "./CreateProjectViewAddRoleGPT";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViewAddRole",
  component: CreateProjectViewAddRoleGPT,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViewAddRoleGPT>;

const Template: ComponentStory<typeof CreateProjectViewAddRoleGPT> = (args) => (
  <CreateProjectViewAddRoleGPT {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roleIndex: 0,
  battery: 20,
  onBack: () => null,
};

export const Edit = Template.bind({});
Edit.args = {
  project: getProject(),
  roleIndex: 0,
  battery: 20,
  onBack: () => null,
};
