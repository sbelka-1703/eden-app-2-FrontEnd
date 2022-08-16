import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidateSelectionList } from "./CandidateSelectionList";

export default {
  title: "Components/CandidateSelectionList",
  component: CandidateSelectionList,
  argTypes: {},
} as ComponentMeta<typeof CandidateSelectionList>;

const Template: ComponentStory<typeof CandidateSelectionList> = (args) => (
  <div className={`max-w-lg`}>
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
  Array.from({ length: 6 }, (_, i) => {
    return {
      _id: Number(faker.random.numeric(5)),
      avatar: faker.internet.avatar(),
      name: faker.internet.userName(),
      percentage: Number(faker.random.numeric(2)),
      skills: faker.helpers.uniqueArray(skills, 3),
      endorsements: Number(faker.random.numeric(2)),
    };
  });

const scrumCandidates = getCandidates();
const frontendCandidates = getCandidates();
const backendCandidates = getCandidates();
const productManagerCandidates = getCandidates();

const roles = [
  { _id: 1, name: "Scrum Master", candidates: scrumCandidates },
  { _id: 2, name: "Frontend", candidates: frontendCandidates },
  { _id: 3, name: "Backend", candidates: backendCandidates },
  { _id: 4, name: "Product Manager", candidates: productManagerCandidates },
];

export const Default = Template.bind({});
Default.args = {
  roles,
};
