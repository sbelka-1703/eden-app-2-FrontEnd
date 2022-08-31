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

const getSkills = () =>
  Array.from({ length: 6 }, () => {
    return {
      skillInfo: {
        _id: Number(faker.random.numeric(5)),
        name: faker.helpers.uniqueArray(skills, 1),
        __typename: "Skills",
      },
      __typename: "skillType_member",
    };
  });

const member = {
  _id: String(faker.random.numeric(5)),
  discordAvatar: faker.internet.avatar(),
  discordName: faker.internet.userName(),
  bio: faker.lorem.sentences(5),
  skills: getSkills(),
  content: {
    interest: faker.lorem.lines(),
    mostProud: faker.lorem.sentences(5),
    showCaseAbility: faker.lorem.sentences(4),
  },
  archiveProjects: [],
  discriminator: "0208",
  hoursPerWeek: String(faker.random.numeric(2)),
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
