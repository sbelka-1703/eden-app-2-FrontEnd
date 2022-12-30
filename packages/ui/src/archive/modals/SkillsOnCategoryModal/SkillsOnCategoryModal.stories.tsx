import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsOnCategoryModal } from "./SkillsOnCategoryModal";

export default {
  title: "Archive/Modals/SkillsOnCategoryModal",
  component: SkillsOnCategoryModal,
  argTypes: {},
} as ComponentMeta<typeof SkillsOnCategoryModal>;

const Template: ComponentStory<typeof SkillsOnCategoryModal> = (args) => (
  <SkillsOnCategoryModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: getSkillRoleTypeMockArray(6),
  isOpen: true,
  handelAddSkills() {
    console.log("SkillsOnCategoryModal HandelAddSkills");
  },
};
