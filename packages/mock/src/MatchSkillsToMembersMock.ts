import { faker } from "@faker-js/faker";

import { getMember, getSkills } from "./MembersMock";

export const randomPercentage = (): number => {
  return faker.datatype.number({ min: 0, max: 100, precision: 0.00001 });
};

export const getMatchPercentage = () => ({
  totalPercentage: randomPercentage(),
  skillTotalPercentage: randomPercentage(),
  hoursPercentage: randomPercentage(),
  budgetPercentage: randomPercentage(),
});

export const getSkillsPercentage = () => ({
  info: getSkills(faker.datatype.number({ min: 2, max: 36, precision: 1 })),
  percentage100: getMatchPercentage(),
  percentageReal: getMatchPercentage(),
});

export const matchSkillsToMembers = () => ({
  matchPercentage: getMatchPercentage(),
  members: getMember(),
  skillsPercentage: getSkillsPercentage(),
});
