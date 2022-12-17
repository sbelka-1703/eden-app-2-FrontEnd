/* eslint-disable camelcase */
import {
  LevelEnum,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";

const level = ["learning", "junior", "mid", "senior"];

export const getSkillRoleTypeMock = (): SkillRoleType => ({
  comment: faker.lorem.sentences(5),
  level: faker.helpers.uniqueArray(level, 1)[0],
  numEndorsement: String(
    faker.datatype.number({ min: 0, max: 999, precision: 1 })
  ),
  skillData: faker.helpers.uniqueArray(skills, 1)[0],
});

export const getSkillRoleTypeMockArray = (total: number): SkillRoleType[] =>
  Array.from({ length: total }, () => getSkillRoleTypeMock());

export const getSkillTypeMemberMock = (): SkillType_Member => ({
  level: faker.helpers.uniqueArray(level, 1)[0] as LevelEnum,
  skillInfo: faker.helpers.uniqueArray(skills, 1)[0],
});

export const getSkillTypeMemberMockArray = (
  total: number
): SkillType_Member[] =>
  Array.from({ length: total }, () => getSkillTypeMemberMock());
