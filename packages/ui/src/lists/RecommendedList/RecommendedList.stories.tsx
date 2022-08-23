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
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      avatar: faker.internet.avatar(),
      //   percentage: Number(faker.random.numeric(2)),
      //   position: faker.hacker.ingverb(),
      //   favButton: true,
    };
  });

const Template: ComponentStory<typeof RecommendedList> = (args) => (
  <RecommendedList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjects(),
};
