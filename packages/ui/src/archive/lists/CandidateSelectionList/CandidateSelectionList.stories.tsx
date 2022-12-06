import { getMember } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidateSelectionList } from "./CandidateSelectionList";

export default {
  title: "Archive/Lists/CandidateSelectionList",
  component: CandidateSelectionList,
  argTypes: {},
} as ComponentMeta<typeof CandidateSelectionList>;

const Template: ComponentStory<typeof CandidateSelectionList> = (args) => (
  <div className={``}>
    <CandidateSelectionList {...args} />
  </div>
);

const getCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      member: getMember(),
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
