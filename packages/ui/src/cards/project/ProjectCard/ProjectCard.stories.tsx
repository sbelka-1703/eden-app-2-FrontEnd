import { getProject } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCard } from "./ProjectCard";

export default {
  title: "Cards/Project/ProjectCard",
  component: ProjectCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  avatar: faker.internet.avatar(),
  position: faker.hacker.ingverb(),
  percentage: Number(faker.random.numeric(2)),
  focused: false,
  favButton: true,
  applyButton: false,
  statusButton: false,
  inviteButton: false,
};
