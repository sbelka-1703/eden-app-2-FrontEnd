import {
  getProject,
  getRoleTypeMock,
  matchNodesToMembersMockArray,
} from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChampionNodesMatchContainer } from "./ChampionNodesMatchContainer";

export default {
  title: "Containers/ChampionNodesMatchContainer",
  component: ChampionNodesMatchContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionNodesMatchContainer>;

const Template: ComponentStory<typeof ChampionNodesMatchContainer> = (args) => (
  <ChampionNodesMatchContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  matchingMembers: matchNodesToMembersMockArray(8),
  selectedRole: getRoleTypeMock(),
};
