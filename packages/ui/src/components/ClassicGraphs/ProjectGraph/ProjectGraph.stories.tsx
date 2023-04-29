import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectGraph } from "./ProjectGraph";

export default {
  title: "Components/ProjectGraph",
  component: ProjectGraph,
  argTypes: {},
} as ComponentMeta<typeof ProjectGraph>;

const Template: ComponentStory<typeof ProjectGraph> = (args) => {
  return <ProjectGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  projectId: getProject()._id!,
};
