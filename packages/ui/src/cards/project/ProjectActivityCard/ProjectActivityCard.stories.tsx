import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectActivityCard } from "./ProjectActivityCard";

export default {
  title: "Cards/Project/ProjectActivityCard",
  component: ProjectActivityCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectActivityCard>;

const Template: ComponentStory<typeof ProjectActivityCard> = (args) => (
  <ProjectActivityCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: "July 12, 2022",
  title: "Reached a major milestone!",
  description: "Soil reached a major milestone of 4000 daily active users!",
};
