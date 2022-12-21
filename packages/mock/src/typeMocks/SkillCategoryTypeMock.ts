import {
  SkillCategory,
  SkillSubCategory,
} from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";

export const getSkillCategoryTypeMock = (): SkillCategory => ({
  _id: String(faker.random.numeric(5)),
  description: faker.lorem.paragraph(),
  emoji: faker.internet.emoji(),
  name: faker.name.firstName(),
  skills: faker.helpers.uniqueArray(skills, 1),
  subCategorySkill: getSkillSubCategoryTypeMockArray(
    Number(faker.random.numeric(1))
  ),
});

export const getSkillCategoryTypeMockArray = (total: number): SkillCategory[] =>
  Array.from({ length: total }, () => getSkillCategoryTypeMock());

export const getSkillSubCategoryTypeMock = (): SkillSubCategory => {
  return {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    name: faker.name.firstName(),
    skills: faker.helpers.uniqueArray(skills, 1),
  };
};

export const getSkillSubCategoryTypeMockArray = (
  total: number
): SkillSubCategory[] =>
  Array.from({ length: total }, () => getSkillSubCategoryTypeMock());
