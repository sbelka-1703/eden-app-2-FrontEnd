import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "storybook/mocks";

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
  member: getMember(),
  percentage: Number(faker.random.numeric(2)),
  endorsements: Number(faker.random.numeric(2)),
  focused: false,
  engagedCard: false,
};
