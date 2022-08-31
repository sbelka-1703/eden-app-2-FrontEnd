import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChampionRecruitContainer } from "./ChampionRecruitContainer";

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

const member = {
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
      __typename: "skillType_member",
    },
    {
      skillInfo: {
        _id: Number(faker.random.numeric(5)),
        name: faker.helpers.uniqueArray(skills, 1),
        __typename: "Skills",
      },
      __typename: "skillType_member",
    },
    {
      skillInfo: {
        _id: Number(faker.random.numeric(5)),
        name: faker.helpers.uniqueArray(skills, 1),
        __typename: "Skills",
      },
      __typename: "skillType_member",
    },
  ],
  archiveProjects: [],
  discriminator: "0208",
  hoursPerWeek: null,
  interest: null,
  links: [],
  timeZone: null,
  __typename: "Members",
};

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
