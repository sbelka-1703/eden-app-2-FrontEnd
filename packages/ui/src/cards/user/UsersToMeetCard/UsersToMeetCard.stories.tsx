import { matchNodesToMembersMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UsersToMeetCard } from "./UsersToMeetCard";

export default {
  title: "Cards/User/UsersToMeetCard",
  component: UsersToMeetCard,
  argTypes: {},
} as ComponentMeta<typeof UsersToMeetCard>;

const Template: ComponentStory<typeof UsersToMeetCard> = (args) => (
  <UsersToMeetCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  members: matchNodesToMembersMockArray(10),
  refetchMatchMembers: () => {
    () => console.log("refetch");
  },
};
