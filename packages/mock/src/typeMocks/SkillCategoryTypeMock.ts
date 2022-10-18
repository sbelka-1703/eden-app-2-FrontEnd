import { faker } from "@faker-js/faker";

import { skills } from "../data";

export const SkillCategoryTypeMock = () => ({
  _id: String(faker.random.numeric(5)),
  description: faker.lorem.paragraph(),
  emoji: faker.helpers.arrayElement(["🚀", "👨‍🚀", "👩‍🚀"]),
  name: faker.name.firstName(),
  skills: faker.helpers.uniqueArray(skills, 1)[0],
  subCategorySkill: SkillSubCategoryTypeMock(),
});

export const SkillSubCategoryTypeMock = () => ({
  _id: String(faker.random.numeric(5)),
  description: faker.lorem.paragraph(),
  emoji: faker.helpers.arrayElement(["🚀", "👨‍🚀", "👩‍🚀"]),
  name: faker.name.firstName(),
  skills: faker.helpers.uniqueArray(skills, 1)[0],
});
