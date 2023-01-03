/* eslint-disable camelcase */
import { getMatchSkillsToProjectsOutputMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectMatchList } from "./ProjectMatchList";

export default {
  title: "Archive/Lists/ProjectMatchList",
  component: ProjectMatchList,
  argTypes: {},
} as ComponentMeta<typeof ProjectMatchList>;

const Template: ComponentStory<typeof ProjectMatchList> = (args) => (
  <ProjectMatchList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchedProjects: getMatchSkillsToProjectsOutputMockArray(8),
  loadingProject: false,
};
