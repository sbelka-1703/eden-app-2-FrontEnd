import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews4 } from "./CreateProjectViews4";

export default {
  title: "Containers/CreateProjectContainer/older/CreateProjectViews4",
  component: CreateProjectViews4,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews4>;

const Template: ComponentStory<typeof CreateProjectViews4> = (args) => (
  <CreateProjectViews4 {...args} />
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
