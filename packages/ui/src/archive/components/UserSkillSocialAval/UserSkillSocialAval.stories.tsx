import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserSkillSocialAval } from "./UserSkillSocialAval";

export default {
  title: "Archive/Components/UserSkillSocialAval",
  component: UserSkillSocialAval,
  argTypes: {},
} as ComponentMeta<typeof UserSkillSocialAval>;

const Template: ComponentStory<typeof UserSkillSocialAval> = (args) => (
  <UserSkillSocialAval {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
