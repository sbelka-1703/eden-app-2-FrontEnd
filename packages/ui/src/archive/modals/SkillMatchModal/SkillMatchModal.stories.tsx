import { getSkillsPercentageTypeMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillMatchModal } from "./SkillMatchModal";

export default {
  title: "Archive/Modals/SkillMatchModal",
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
  projectCost: 70,
  yourCost: 140,
  projectHr: 25,
  yourHr: 15,
  matchingPercentage: 81,
  chartData: getSkillsPercentageTypeMockArray(5),
};
