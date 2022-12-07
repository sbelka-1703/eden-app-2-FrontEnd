import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TopicCardComment } from "./TopicCardComment";

export default {
  title: "Archive/Cards/TopicCardComment",
  component: TopicCardComment,
  argTypes: {},
} as ComponentMeta<typeof TopicCardComment>;

const Template: ComponentStory<typeof TopicCardComment> = (args) => (
  <TopicCardComment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: faker.internet.avatar(),
  title: faker.lorem.sentences(2),
  messege: faker.lorem.paragraph(),
  firstUserName: faker.internet.userName("Jeanne", "Doe"),
  secondUserName: faker.internet.userName(),
};
