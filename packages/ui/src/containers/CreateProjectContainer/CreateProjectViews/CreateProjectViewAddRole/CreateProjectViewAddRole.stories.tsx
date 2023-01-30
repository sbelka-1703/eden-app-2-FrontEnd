import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViewAddRole } from "./CreateProjectViewAddRole";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViewAddRole",
  component: CreateProjectViewAddRole,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViewAddRole>;

const Template: ComponentStory<typeof CreateProjectViewAddRole> = (args) => (
  <CreateProjectViewAddRole {...args} />
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
