import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews5 } from "./CreateProjectViews5";

export default {
  title: "Containers/CreateProjectContainer/older/CreateProjectViews5",
  component: CreateProjectViews5,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews5>;

const Template: ComponentStory<typeof CreateProjectViews5> = (args) => (
  <CreateProjectViews5 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  battery: 20,
  onBack: () => null,
  onNext: () => null,
};

export const Edit = Template.bind({});
Edit.args = {
  project: getProject(),
  battery: 20,
  onBack: () => null,
  onNext: () => null,
};
