import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// import { ApolloDecorator } from "../../../../../apps/storybook/.storybook/decorator";
import { CandidateSelectionList } from "./CandidateSelectionList";

export default {
  title: "Lists/CandidateSelectionList",
  component: CandidateSelectionList,
  argTypes: {},
  // decorators: [ApolloDecorator],
} as ComponentMeta<typeof CandidateSelectionList>;

const Template: ComponentStory<typeof CandidateSelectionList> = (args) => (
  <div className={``}>
    <CandidateSelectionList {...args} />
  </div>
);

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

const getCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      member: {
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

const randomCandidates = getCandidates();

const roles = [
  {
    _id: "62f14dc33235560004a48119",
    title: "Workshop Guid",
    __typename: "RoleTemplate",
    skills: [
      {
        name: "Workshop Facilitation",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },
      {
        name: "Modeling & Analytics",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },
    ],
  },
  {
    _id: "62f14de73235560004a48138",
    title: "Blockchain Engineer",
    __typename: "RoleTemplate",
    skills: [
      {
        name: "Workshop Facilitation",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },

      {
        name: "Modeling & Analytics",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },
    ],
  },
  {
    _id: "62f3deeb184afd000459a848",
    title: "FrontEnd ",
    __typename: "RoleTemplate",
    skills: [
      {
        name: "Workshop Facilitation",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },

      {
        name: "Modeling & Analytics",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },
    ],
  },
  {
    _id: "62f3def8184afd000459a850",
    title: "BackEnd ",
    __typename: "RoleTemplate",
    skills: [
      {
        name: "Workshop Facilitation",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },

      {
        name: "Modeling & Analytics",
        __typename: "Skills",
        _id: String(faker.random.numeric(5)),
      },
    ],
  },
];

const members = [...randomCandidates];

export const Default = Template.bind({});
Default.args = {
  roles,
  members,
};
