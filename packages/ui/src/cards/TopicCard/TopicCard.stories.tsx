import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TopicCard } from "./TopicCard";

export default {
  title: "Cards/TopicCard",
  component: TopicCard,
  argTypes: {},
} as ComponentMeta<typeof TopicCard>;

const Template: ComponentStory<typeof TopicCard> = (args) => (
  <TopicCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
