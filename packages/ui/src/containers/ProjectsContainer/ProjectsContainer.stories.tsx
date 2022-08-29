import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectsContainer } from "./ProjectsContainer";

export default {
  title: "Containers/ProjectsContainer",
  component: ProjectsContainer,
  argTypes: {},
} as ComponentMeta<typeof ProjectsContainer>;

const getProjects = () =>
  Array.from({ length: 6 }, () => {
    return {
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      avatar: faker.internet.avatar(),
      favorite: true,
      // percentage: Number(faker.random.numeric(2)),
      // position: faker.hacker.ingverb(),
      // favButton: true,
      __typename: "Project",
    };
  });

const allProjects = getProjects();
const recommendedProjects = getProjects();
const favouriteProjects = getProjects();

const Template: ComponentStory<typeof ProjectsContainer> = (args) => (
  <ProjectsContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  allProjects,
  recommendedProjects,
  favouriteProjects,
};
