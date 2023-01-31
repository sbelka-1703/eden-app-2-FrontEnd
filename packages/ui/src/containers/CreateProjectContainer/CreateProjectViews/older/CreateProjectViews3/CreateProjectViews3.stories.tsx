import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews3 } from "./CreateProjectViews3";

export default {
  title: "Containers/CreateProjectContainer/older/CreateProjectViews3",
  component: CreateProjectViews3,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews3>;

const Template: ComponentStory<typeof CreateProjectViews3> = (args) => (
  <CreateProjectViews3 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  battery: 20,
  onBack: () => null,
  onSkip: () => null,
  onNext: () => null,
};

export const Edit = Template.bind({});
Edit.args = {
  project: getProject(),
  battery: 20,
  onBack: () => null,
  onSkip: () => null,
  onNext: () => null,
};
