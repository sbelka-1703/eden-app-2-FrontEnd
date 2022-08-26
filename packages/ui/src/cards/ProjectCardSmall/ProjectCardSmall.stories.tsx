import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCardSmall } from "./ProjectCardSmall";

export default {
  title: "Cards/ProjectCardSmall",
  component: ProjectCardSmall,
  argTypes: {},
} as ComponentMeta<typeof ProjectCardSmall>;

const Template: ComponentStory<typeof ProjectCardSmall> = (args) => (
  <ProjectCardSmall {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: {
    title: faker.company.name(),
  },
  avatar: faker.internet.avatar(),
  focused: false,
  totalDays: 100,
  currentDayCount: 50
};
