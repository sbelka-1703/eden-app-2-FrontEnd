import { matchNodesToMembersMock } from "@eden/package-mock";
// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserDiscoverCard } from "./UserDiscoverCard";

export default {
  title: "Cards/User/UserDiscoverCard",
  component: UserDiscoverCard,
  argTypes: {},
} as ComponentMeta<typeof UserDiscoverCard>;

const Template: ComponentStory<typeof UserDiscoverCard> = (args) => (
  <UserDiscoverCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchMember: matchNodesToMembersMock(),
};
