import { RoleType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getSkillRoleTypeMockArray } from "./";

export const getRoleTypeMock = (): RoleType => ({
  _id: String(faker.random.numeric(5)),
  archive: faker.datatype.boolean(),
  budget: {
    perHour: faker.finance.amount(0, 100, 2),
    token: "CODE",
    totalBudget: faker.finance.amount(0, 100, 2),
  },
  dateRangeEnd: "1662161995158",
  dateRangeStart: "1662161995158",
  description: faker.lorem.sentences(5),
  keyRosponsibilities: faker.lorem.sentences(4),
  openPositions: faker.datatype.number({ min: 1, max: 10, precision: 1 }),
  skills: getSkillRoleTypeMockArray(6),
  title: faker.name.firstName(),
  hoursPerWeek: faker.datatype.number({ min: 1, max: 40, precision: 1 }),
});

export const getRoleTypeMockArray = (total: number): RoleType[] =>
  Array.from({ length: total }, () => getRoleTypeMock());
