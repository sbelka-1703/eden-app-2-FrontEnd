import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViewStartGPT } from "./CreateProjectViewStartGPT";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViewStartGPT",
  component: CreateProjectViewStartGPT,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViewStartGPT>;

const Template: ComponentStory<typeof CreateProjectViewStartGPT> = (args) => (
  <CreateProjectViewStartGPT {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onNext: () => null,
  battery: 0,
};

export const Edit = Template.bind({});
Edit.args = {
  project: getProject(),
  battery: 20,
  onNext: () => null,
};
