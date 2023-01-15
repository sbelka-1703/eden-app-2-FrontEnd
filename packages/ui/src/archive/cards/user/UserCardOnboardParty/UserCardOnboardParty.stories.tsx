import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserCardOnboardParty } from "./UserCardOnboardParty";

export default {
  title: "Archive/Cards/User/UserCardOnboardParty",
  component: UserCardOnboardParty,
  argTypes: {},
} as ComponentMeta<typeof UserCardOnboardParty>;

const Template: ComponentStory<typeof UserCardOnboardParty> = (args) => (
  <UserCardOnboardParty {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
