// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "storybook/mocks";

import { UserProfileCard } from "./UserProfileCard";

export default {
  title: "Cards/UserProfileCard",
  component: UserProfileCard,
  argTypes: {},
} as ComponentMeta<typeof UserProfileCard>;

const Template: ComponentStory<typeof UserProfileCard> = (args) => (
  <UserProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  role: "Scrum Master",
};
