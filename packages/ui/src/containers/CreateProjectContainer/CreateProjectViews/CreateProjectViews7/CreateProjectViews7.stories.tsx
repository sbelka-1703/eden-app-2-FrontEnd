import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews7 } from "./CreateProjectViews7";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews7",
  component: CreateProjectViews7,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews7>;

const Template: ComponentStory<typeof CreateProjectViews7> = (args) => (
  <CreateProjectViews7 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roleIndex: 0,
  onBack: () => null,
  onNext: (data) => console.info(data),
};

export const Edit = Template.bind({});
Edit.args = {
  project: getProject(),
  roleIndex: 0,
  onBack: () => null,
  onNext: (data) => console.info(data),
};
