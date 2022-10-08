import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Charts } from "./Charts";
import { getSkillsPercentageArray } from "@eden/package-mock";
export default {
  title: "Components/Charts",
  component: Charts,
  argTypes: {},
} as ComponentMeta<typeof Charts>;

const Template: ComponentStory<typeof Charts> = (args) => <Charts {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: getSkillsPercentageArray(5),
};
