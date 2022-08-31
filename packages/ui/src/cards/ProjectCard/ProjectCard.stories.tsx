import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCard } from "./ProjectCard";

export default {
  title: "Cards/ProjectCard",
  component: ProjectCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: {
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
  },
  avatar: faker.internet.avatar(),
  position: faker.hacker.ingverb(),
  percentage: Number(faker.random.numeric(2)),
  focused: false,
  favButton: true,
  favorite: false,
};
