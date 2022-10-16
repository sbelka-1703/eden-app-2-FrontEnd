import { faker } from "@faker-js/faker";

import { skills } from "../data";

const level = ["learning", "junior", "mid", "senior"];

export const getSkillRoleTypeMock = () => ({
  comment: faker.lorem.sentences(5),
  level: faker.helpers.uniqueArray(level, 1)[0],
  numEndorsement: String(
    faker.datatype.number({ min: 0, max: 999, precision: 1 })
  ),
  skillData: faker.helpers.uniqueArray(skills, 1)[0],
});

export const getSkillTypeMemberMock = () => ({
  level: String(faker.datatype.number({ min: 1, max: 99, precision: 1 })),
  skillInfo: faker.helpers.uniqueArray(skills, 1)[0],
});
