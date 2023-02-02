import { getSkillTypeMemberMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillList } from "./SkillList";

export default {
  title: "Archive/Lists/SkillList",
  component: SkillList,
  argTypes: {},
} as ComponentMeta<typeof SkillList>;

const Template: ComponentStory<typeof SkillList> = (args) => (
  <SkillList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  colorRGB: "215,215,255",
  skills: getSkillTypeMemberMockArray(10),
};
