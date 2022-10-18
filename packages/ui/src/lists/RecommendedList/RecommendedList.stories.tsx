import { getProject } from "@eden/package-mock";
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
      projectData: getProject(),
      avatar: faker.internet.avatar(),
      matchPercentage: Number(faker.random.numeric(2)),
    };
  });

const Template: ComponentStory<typeof RecommendedList> = (args) => (
  <RecommendedList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjects(),
};
