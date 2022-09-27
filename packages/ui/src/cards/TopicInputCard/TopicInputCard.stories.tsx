import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TopicInputCard } from "./TopicInputCard";

export default {
  title: "Cards/TopicInputCard",
  component: TopicInputCard,
  argTypes: {},
} as ComponentMeta<typeof TopicInputCard>;

const Template: ComponentStory<typeof TopicInputCard> = (args) => (
  <TopicInputCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
