// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// import { ApolloDecorator } from "../../../../../apps/storybook/.storybook/decorator";
import { CandidateSelectionList } from "./CandidateSelectionList";

export default {
  title: "Components/CandidateSelectionList",
  component: CandidateSelectionList,
  argTypes: {},
  // decorators: [ApolloDecorator],
} as ComponentMeta<typeof CandidateSelectionList>;

const Template: ComponentStory<typeof CandidateSelectionList> = (args) => (
  <div className={`max-w-lg`}>
    <CandidateSelectionList {...args} />
  </div>
);

// const skills = [
//   "3D",
//   "Solidity",
//   "Design",
//   "Fullstack",
//   "React",
//   "Node.js",
//   "Mentorship",
//   "Figma",
//   "Adobe",
//   "Tailwind",
//   "Leadership",
// ];

// const getCandidates = () =>
//   Array.from({ length: 6 }, (_, i) => {
//     return {
//       matchPercentage: faker.random.numeric(2),
//       member: {
//         _id: Number(faker.random.numeric(5)),
//         avatar: faker.internet.avatar(),
//         name: faker.internet.userName(),
//         percentage: Number(faker.random.numeric(2)),
//         skills: faker.helpers.uniqueArray(skills, 3),
//         endorsements: Number(faker.random.numeric(2)),
//       },
//     };
//   });

// const scrumCandidates = getCandidates();
// const frontendCandidates = getCandidates();
// const backendCandidates = getCandidates();
// const productManagerCandidates = getCandidates();

const roles = [
  {
    _id: "62f14dc33235560004a48119",
    title: "Workshop Guid",
    __typename: "RoleTemplate",
    skills: [],
  },
  {
    _id: "62f14de73235560004a48138",
    title: "Blockchain Engineer",
    __typename: "RoleTemplate",
    skills: [],
  },
  {
    _id: "62f3deeb184afd000459a848",
    title: "FrontEnd ",
    __typename: "RoleTemplate",
    skills: [],
  },
  {
    _id: "62f3def8184afd000459a850",
    title: "BackEnd ",
    __typename: "RoleTemplate",
    skills: [],
  },
];

export const Default = Template.bind({});
Default.args = {
  roles,
};
