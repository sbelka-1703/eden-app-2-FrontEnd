import { SkillsPercentage } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { randomPercentage } from "../utils";

export const getSkillsPercentageTypeMock = (): SkillsPercentage => ({
  info: faker.helpers.uniqueArray(skills, 1)[0],
  percentage100: randomPercentage(),
  percentageReal: randomPercentage(),
});

export const getSkillsPercentageTypeMockArray = (
  total: number
): SkillsPercentage[] =>
  Array.from({ length: total }, () => getSkillsPercentageTypeMock());
