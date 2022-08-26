import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserCard } from "./UserCard";

export default {
  title: "Cards/UserCard",
  component: UserCard,
  argTypes: {},
} as ComponentMeta<typeof UserCard>;

const Template: ComponentStory<typeof UserCard> = (args) => (
  <UserCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: {
    discordName: faker.internet.userName(),
    discordAvatar: faker.internet.avatar(),
    skills: [
      { skillInfo: { _id: "0", name: "Fullstack" } },
      { skillInfo: { _id: "1", name: "Backend" } },
      { skillInfo: { _id: "2", name: "Frontend" } },
    ],
  },
  percentage: 84,
  endorsements: 10,
  focused: false,
};
