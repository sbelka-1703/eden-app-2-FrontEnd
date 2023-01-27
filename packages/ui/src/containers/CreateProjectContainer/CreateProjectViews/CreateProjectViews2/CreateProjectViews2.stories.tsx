import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews2 } from "./CreateProjectViews2";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews2",
  component: CreateProjectViews2,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews2>;

const Template: ComponentStory<typeof CreateProjectViews2> = (args) => (
  <CreateProjectViews2 {...args} />
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
