import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChampionMatchContainer } from "./ChampionMatchContainer";

export default {
  title: "Containers/ChampionMatchContainer",
  component: ChampionMatchContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionMatchContainer>;

const Template: ComponentStory<typeof ChampionMatchContainer> = (args) => (
  <ChampionMatchContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  onSelectMember: (member) => console.info(member),
};
