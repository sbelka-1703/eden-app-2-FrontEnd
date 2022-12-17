import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserMiniCard } from "./UserMiniCard";

export default {
  title: "Cards/User/UserMiniCard",
  component: UserMiniCard,
  argTypes: {},
} as ComponentMeta<typeof UserMiniCard>;

const Template: ComponentStory<typeof UserMiniCard> = (args) => (
  <UserMiniCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
