import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RecommendedList } from "./RecommendedList";

export default {
  title: "Lists/RecommendedList",
  component: RecommendedList,
  argTypes: {},
} as ComponentMeta<typeof RecommendedList>;

const getProjects = () =>
  Array.from({ length: 6 }, () => {
    return {
      projectData: {
        title: faker.company.name(),
        description: faker.company.catchPhrase(),
      },
      avatar: faker.internet.avatar(),
      __typename: "Project",
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
    };
  });

const Template: ComponentStory<typeof RecommendedList> = (args) => (
  <RecommendedList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // @ts-ignore
  projects: getProjects(),
};
