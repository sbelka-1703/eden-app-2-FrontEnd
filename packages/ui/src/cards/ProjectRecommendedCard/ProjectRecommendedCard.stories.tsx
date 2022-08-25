import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectRecommendedCard } from "./ProjectRecommendedCard";

export default {
  title: "Cards/ProjectRecommendedCard",
  component: ProjectRecommendedCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectRecommendedCard>;

const Template: ComponentStory<typeof ProjectRecommendedCard> = (args) => (
  <ProjectRecommendedCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: {
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
  },
  avatar: faker.internet.avatar(),
};
