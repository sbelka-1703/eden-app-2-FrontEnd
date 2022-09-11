// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProjectArray } from "storybook/mocks";

import { ProjectMatchList } from "./ProjectMatchList";

export default {
  title: "Lists/ProjectMatchList",
  component: ProjectMatchList,
  argTypes: {},
} as ComponentMeta<typeof ProjectMatchList>;

// const getProjects = () =>
//   Array.from({ length: 6 }, () => {
//     return {
//       title: faker.company.name(),
//       description: faker.company.catchPhrase(),
//       avatar: faker.internet.avatar(),
//       percentage: Number(faker.random.numeric(2)),
//       position: faker.hacker.ingverb(),
//       favButton: true,
//       __typename: "Project",
//     };
//   });

const Template: ComponentStory<typeof ProjectMatchList> = (args) => (
  <ProjectMatchList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(8),
};
