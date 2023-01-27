import { matchNodesToMembersMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserDiscoverCardTest } from "./UserDiscoverCardTest";

export default {
  title: "Cards/User/UserDiscoverCardTest",
  component: UserDiscoverCardTest,
  argTypes: {},
} as ComponentMeta<typeof UserDiscoverCardTest>;

const Template: ComponentStory<typeof UserDiscoverCardTest> = (args) => (
  <UserDiscoverCardTest {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchMember: matchNodesToMembersMock(),
};
