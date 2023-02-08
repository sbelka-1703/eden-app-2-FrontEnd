import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews2GPT } from "./CreateProjectViews2GPT";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews2GPT",
  component: CreateProjectViews2GPT,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews2GPT>;

const Template: ComponentStory<typeof CreateProjectViews2GPT> = (args) => (
  <CreateProjectViews2GPT {...args} />
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
