import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TopicCommentInputCard } from "./TopicCommentInputCard";

export default {
  title: "Cards/TopicCommentInputCard",
  component: TopicCommentInputCard,
  argTypes: {},
} as ComponentMeta<typeof TopicCommentInputCard>;

const Template: ComponentStory<typeof TopicCommentInputCard> = (args) => (
  <TopicCommentInputCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: faker.internet.avatar(),
  userName: faker.internet.userName(),
};
