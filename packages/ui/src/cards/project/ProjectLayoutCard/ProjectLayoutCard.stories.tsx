import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectLayoutCard } from "./ProjectLayoutCard";

export default {
  title: "Cards/Project/ProjectLayoutCard",
  component: ProjectLayoutCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectLayoutCard>;

const Template: ComponentStory<typeof ProjectLayoutCard> = (args) => (
  <ProjectLayoutCard {...args} showRoles />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};
