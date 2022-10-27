import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChampionRecruitContainer } from "./ChampionRecruitContainer";

export default {
  title: "Archive/Containers/ChampionRecruitContainer",
  component: ChampionRecruitContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionRecruitContainer>;

const Template: ComponentStory<typeof ChampionRecruitContainer> = (args) => (
  <ChampionRecruitContainer {...args} />
);

export const Default = Template.bind({});
Default.args = { member: getMember() };
