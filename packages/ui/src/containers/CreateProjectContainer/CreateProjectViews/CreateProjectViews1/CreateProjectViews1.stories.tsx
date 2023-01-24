import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews1 } from "./CreateProjectViews1";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews1",
  component: CreateProjectViews1,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews1>;

const Template: ComponentStory<typeof CreateProjectViews1> = (args) => (
  <CreateProjectViews1 {...args} />
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
