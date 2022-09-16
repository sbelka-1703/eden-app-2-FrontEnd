import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "storybook/mocks";

import { ProjectLayoutCard } from "./ProjectLayoutCard";

export default {
  title: "Cards/Project/ProjectLayoutCard",
  component: ProjectLayoutCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectLayoutCard>;

const Template: ComponentStory<typeof ProjectLayoutCard> = (args) => (
  <ProjectLayoutCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};
