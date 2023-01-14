import {
  getMember,
  getSkillRoleTypeMockArray,
  matchNodesToMembersMock,
} from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberMatchCard } from "./MemberMatchCard";

export default {
  title: "Archive/Cards/MemberMatchCard",
  component: MemberMatchCard,
  argTypes: {},
} as ComponentMeta<typeof MemberMatchCard>;

const Template: ComponentStory<typeof MemberMatchCard> = (args) => (
  <MemberMatchCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  requiredSkills: getSkillRoleTypeMockArray(12),
  percentage: "81",
  member: getMember(),
  matchedMember: matchNodesToMembersMock(),
};
