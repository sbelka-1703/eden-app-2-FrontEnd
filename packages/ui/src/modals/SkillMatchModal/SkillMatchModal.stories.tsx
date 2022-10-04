import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillMatchModal } from "./SkillMatchModal";

export default {
  title: "Modals/SkillMatchModal",
  component: SkillMatchModal,
  argTypes: {},
} as ComponentMeta<typeof SkillMatchModal>;

const Template: ComponentStory<typeof SkillMatchModal> = (args) => (
  <SkillMatchModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
  budget: 24,
  avaiability: 64,
  projectCost: "70 USDC",
  yourCost: "140 USDC",
  projectHr: 25,
  yourHr: 15,
  matchingPercentage: 81,
  chartData: [
    {
      name: "Web Design",
      percentage: 60,
    },
    {
      name: "Blockchain",
      percentage: 95,
    },
    {
      name: "Agile Dev",
      percentage: 55,
    },
    {
      name: "Business",
      percentage: 70,
    },
    {
      name: "Marketing",
      percentage: 41,
    },
    {
      name: "Sales",
      percentage: 48,
    },
  ],
};
