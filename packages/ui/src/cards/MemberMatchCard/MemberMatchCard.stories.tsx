import { getMatchingMember, getMember, getSkills } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberMatchCard } from "./MemberMatchCard";

export default {
  title: "Cards/MemberMatchCard",
  component: MemberMatchCard,
  argTypes: {},
} as ComponentMeta<typeof MemberMatchCard>;

const Template: ComponentStory<typeof MemberMatchCard> = (args) => (
  <MemberMatchCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  requiredSkills: getSkills(12),
  percentage: "81",
  member: getMember(),
  matchedMember: getMatchingMember(5),
};
