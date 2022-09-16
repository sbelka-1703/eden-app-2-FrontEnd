/* eslint-disable camelcase */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { findProjects_RecommendedToUser } from "storybook/mocks";

import { ProjectMatchList } from "./ProjectMatchList";

export default {
  title: "Lists/ProjectMatchList",
  component: ProjectMatchList,
  argTypes: {},
} as ComponentMeta<typeof ProjectMatchList>;

export const getProjectArray = (total: number) =>
  Array.from({ length: total }, () => findProjects_RecommendedToUser);

const Template: ComponentStory<typeof ProjectMatchList> = (args) => (
  <ProjectMatchList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(8),
};
