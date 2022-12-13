import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserCardOnboardPartyNodes } from "./UserCardOnboardPartyNodes";

export default {
  title: "Cards/User/UserCardOnboardPartyNodes",
  component: UserCardOnboardPartyNodes,
  argTypes: {},
} as ComponentMeta<typeof UserCardOnboardPartyNodes>;

const Template: ComponentStory<typeof UserCardOnboardPartyNodes> = (args) => (
  <UserCardOnboardPartyNodes {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
