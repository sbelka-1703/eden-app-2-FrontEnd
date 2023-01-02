import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsModal } from "./SkillsModal";

export default {
  title: "Archive/Modals/SkillsModal",
  component: SkillsModal,
  argTypes: {},
} as ComponentMeta<typeof SkillsModal>;

const Template: ComponentStory<typeof SkillsModal> = (args) => (
  <SkillsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: getSkillRoleTypeMockArray(9),
  isOpen: true,
  handelAddSkills() {
    console.log("SkillsModal HandelAddSkills");
  },
};

Default.parameters = {};
