import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillVisualisationComp } from "./SkillVisualisationComp";

export default {
  title: "Components/SkillVisualisationComp",
  component: SkillVisualisationComp,
  argTypes: {},
} as ComponentMeta<typeof SkillVisualisationComp>;

const Template: ComponentStory<typeof SkillVisualisationComp> = (args) => (
  <SkillVisualisationComp {...args} />
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
