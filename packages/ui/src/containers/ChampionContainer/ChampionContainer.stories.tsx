import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "storybook/mocks";

import { ChampionContainer } from "./ChampionContainer";

const getEngagedCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      phase: "committed",
      memberInfo: getMember(),
      __typename: "matchMembersToSkillOutput",
    };
  });

const getCommittedCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      phase: "engaged",
      memberInfo: getMember(),
      __typename: "matchMembersToSkillOutput",
    };
  });

const engagedCandidates = getEngagedCandidates();
const committedCandidates = getCommittedCandidates();
const allCanidates = [...engagedCandidates, ...committedCandidates];
const project: any = {
  _id: "5e9f8f8f3b8f9a0004a48119",
  name: "Project Name",
  description: "Project Description",
  __typename: "Projects",
};

project.team = allCanidates;

export default {
  title: "Containers/ChampionContainer",
  component: ChampionContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionContainer>;

const Template: ComponentStory<typeof ChampionContainer> = (args) => (
  <ChampionContainer {...args} />
);

export const Default = Template.bind({});
Default.args = { project };
