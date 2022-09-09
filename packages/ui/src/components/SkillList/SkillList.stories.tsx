import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillList } from "./SkillList";

export default {
  title: "Components/SkillList",
  component: SkillList,
  argTypes: {},
} as ComponentMeta<typeof SkillList>;

const Template: ComponentStory<typeof SkillList> = (args) => (
  <SkillList {...args} />
);

export const Default = Template.bind({});

Default.args = {};
