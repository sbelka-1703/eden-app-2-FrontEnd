import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberProfileCard } from "./MemberProfileCard";

export default {
  title: "Cards/MemberProfileCard",
  component: MemberProfileCard,
  argTypes: {},
} as ComponentMeta<typeof MemberProfileCard>;

const Template: ComponentStory<typeof MemberProfileCard> = (args) => (
  <MemberProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 65,
};
