import { getProject } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectRecommendedCard } from "./ProjectRecommendedCard";

export default {
  title: "Archive/Cards/Project/ProjectRecommendedCard",
  component: ProjectRecommendedCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectRecommendedCard>;

const Template: ComponentStory<typeof ProjectRecommendedCard> = (args) => (
  <ProjectRecommendedCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  avatar: faker.internet.avatar(),
};
