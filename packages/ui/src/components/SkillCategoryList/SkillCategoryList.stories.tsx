import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillCategoryList } from "./SkillCategoryList";

export default {
  title: "Components/SkillCategoryList",
  component: SkillCategoryList,
  argTypes: {},
} as ComponentMeta<typeof SkillCategoryList>;

const Template: ComponentStory<typeof SkillCategoryList> = (args) => (
  <SkillCategoryList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  skills: [
    {
      skillInfo: {
        _id: "1",
        name: "skill1",
      },
    },
    {
      skillInfo: {
        _id: "2",
        name: "skill2",
      },
    },
    {
      skillInfo: {
        _id: "3",
        name: "skill3",
      },
    },
    {
      skillInfo: {
        _id: "4",
        name: "skill4",
      },
    },
    {
      skillInfo: {
        _id: "5",
        name: "skill5",
      },
    },
    {
      skillInfo: {
        _id: "6",
        name: "skill6",
      },
    },
    {
      skillInfo: {
        _id: "7",
        name: "skill7",
      },
    },
  ],
};
