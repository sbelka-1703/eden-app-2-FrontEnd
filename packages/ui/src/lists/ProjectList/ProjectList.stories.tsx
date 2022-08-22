import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectList } from "./ProjectList";

export default {
  title: "Lists/ProjectList",
  component: ProjectList,
  argTypes: {},
} as ComponentMeta<typeof ProjectList>;

const getProjects = () =>
  Array.from({ length: 6 }, () => {
    return {
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      avatar: faker.internet.avatar(),
      percentage: Number(faker.random.numeric(2)),
      position: faker.hacker.ingverb(),
      favButton: true,
    };
  });

const Template: ComponentStory<typeof ProjectList> = (args) => (
  <ProjectList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjects(),
};
