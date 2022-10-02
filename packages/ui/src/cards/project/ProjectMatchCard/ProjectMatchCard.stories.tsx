/* eslint-disable camelcase */
import { findProjects_RecommendedToUser } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectMatchCard } from "./ProjectMatchCard";

export default {
  title: "Cards/Project/ProjectMatchCard",
  component: ProjectMatchCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectMatchCard>;

const Template: ComponentStory<typeof ProjectMatchCard> = (args) => (
  <ProjectMatchCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: findProjects_RecommendedToUser,
};
