import { Skills } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getSkillSubCategoryTypeMockArray } from "./";

export const getSkillsTypeMock = (): Skills => ({
  _id: String(faker.random.numeric(5)),
  name: faker.name.firstName(),
  subCategorySkill: getSkillSubCategoryTypeMockArray(
    Number(faker.random.numeric(1))
  ),
});

export const getSkillsTypeMockArray = (total: number): Skills[] =>
  Array.from({ length: total }, () => getSkillsTypeMock());
