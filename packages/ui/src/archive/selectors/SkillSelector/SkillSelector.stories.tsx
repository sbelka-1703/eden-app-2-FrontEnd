import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillSelector } from "./SkillSelector";

export default {
  title: "Archive/Selector/SkillSelector",
  component: SkillSelector,
  argTypes: {},
} as ComponentMeta<typeof SkillSelector>;

const Template: ComponentStory<typeof SkillSelector> = (args) => (
  <SkillSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showSelected: true,
};
