import { faker } from "@faker-js/faker";

import { getMember, getSkillsPercentage } from "./MembersMock";

export const randomPercentage = (): number => {
  return faker.datatype.number({ min: 0, max: 100, precision: 0.00001 });
};

export const getMatchPercentage = () => ({
  totalPercentage: randomPercentage(),
  skillTotalPercentage: randomPercentage(),
  hoursPercentage: randomPercentage(),
  budgetPercentage: randomPercentage(),
});

export const matchSkillsToMembers = () => ({
  matchPercentage: getMatchPercentage(),
  members: getMember(),
  skillsPercentage: getSkillsPercentage(),
});
