import { ComponentMeta, ComponentStory } from "@storybook/react";
import { member } from "storybook/mocks";

import { ChampionRecruitContainer } from "./ChampionRecruitContainer";

export default {
  title: "Containers/ChampionRecruitContainer",
  component: ChampionRecruitContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionRecruitContainer>;

const Template: ComponentStory<typeof ChampionRecruitContainer> = (args) => (
  <ChampionRecruitContainer {...args} />
);

export const Default = Template.bind({});
Default.args = { member };
