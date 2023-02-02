import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViewDescription } from "./CreateProjectViewDescription";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViewDescription",
  component: CreateProjectViewDescription,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViewDescription>;

const Template: ComponentStory<typeof CreateProjectViewDescription> = (
  args
) => <CreateProjectViewDescription {...args} />;

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
