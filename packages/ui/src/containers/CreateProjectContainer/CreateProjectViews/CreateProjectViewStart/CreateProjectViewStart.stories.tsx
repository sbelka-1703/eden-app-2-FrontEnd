import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViewStart } from "./CreateProjectViewStart";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViewStart",
  component: CreateProjectViewStart,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViewStart>;

const Template: ComponentStory<typeof CreateProjectViewStart> = (args) => (
  <CreateProjectViewStart {...args} />
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
