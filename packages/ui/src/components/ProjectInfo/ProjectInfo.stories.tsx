import { getProject } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectInfo } from "./ProjectInfo";

export default {
  title: "Components/ProjectInfo",
  component: ProjectInfo,
  argTypes: {},
} as ComponentMeta<typeof ProjectInfo>;

const Template: ComponentStory<typeof ProjectInfo> = (args) => (
  <ProjectInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  avatarSrc: faker.internet.avatar(),
  projectSubTitle: "Find and be found for opportunities across the DAO",
  isFavoriteButton: true,
};
