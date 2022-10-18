import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AddSkillsToRoleCard } from "./AddSkillsToRoleCard";

export default {
  title: "Archive/Cards/AddSkillsToRoleCard",
  component: AddSkillsToRoleCard,
  argTypes: {},
} as ComponentMeta<typeof AddSkillsToRoleCard>;

const Template: ComponentStory<typeof AddSkillsToRoleCard> = (args) => (
  <AddSkillsToRoleCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  numberOfMembers: 0,
  roleTitle: "Back End",
  handleOpenSkillsModal: function (): void {
    throw new Error("Function not implemented.");
  },
};
