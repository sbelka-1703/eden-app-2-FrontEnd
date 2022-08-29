import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChampionContainer } from "./ChampionContainer";

const skills = [
  "3D",
  "Solidity",
  "Design",
  "Fullstack",
  "React",
  "Node.js",
  "Mentorship",
  "Figma",
  "Adobe",
  "Tailwind",
  "Leadership",
];

const getEngagedCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      phase: "committed",
      memberInfo: {
        _id: String(faker.random.numeric(5)),
        discordAvatar: faker.internet.avatar(),
        discordName: faker.internet.userName(),
        bio: null,
        skills: [
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
        ],
        __typename: "Members",
      },
      __typename: "matchMembersToSkillOutput",
    };
  });

const getCommittedCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      phase: "engaged",
      memberInfo: {
        _id: String(faker.random.numeric(5)),
        discordAvatar: faker.internet.avatar(),
        discordName: faker.internet.userName(),
        bio: null,
        skills: [
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
          {
            skillInfo: {
              _id: Number(faker.random.numeric(5)),
              name: faker.helpers.uniqueArray(skills, 1),
              __typename: "Skills",
            },
          },
        ],
        __typename: "Members",
      },
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
  // team: { ...engagedCandidates },
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
