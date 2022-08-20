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
  name: "Blue Panda",
  avatar:
    "https://cdn.discordapp.com/avatars/908392557258604544/3d834ac5b2ed60c37533ffe2c3c3a2a7.jpg",
  title: "Scrum Master",
  percentage: 84,
  skills: [
    { skillInfo: { _id: "0", name: "Fullstack", __typename: "Skill" } },
    { skillInfo: { _id: "1", name: "Backend", __typename: "Skill" } },
    { skillInfo: { _id: "2", name: "Frontend", __typename: "Skill" } },
  ],
  endorsements: 10,
  focused: false,
};
