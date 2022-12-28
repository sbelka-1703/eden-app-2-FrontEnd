import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import {
  getMatchProjectRolesTypeMockArray,
  getSkillsTypeMockArray,
} from "../typeMocks";
import { randomPercentage } from "../utils";
import { getProject } from "./";

export const matchNodesToProjectRolesMock =
  (): MatchSkillsToProjectsOutput => ({
    matchPercentage: randomPercentage(),
    project: getProject(),
    commonSkills: getSkillsTypeMockArray(
      faker.datatype.number({ min: 2, max: 10, precision: 1 })
    ),
    projectRoles: getMatchProjectRolesTypeMockArray(
      faker.datatype.number({ min: 2, max: 5, precision: 1 })
    ),
  });

export const matchNodesToProjectRolesMockArray = (
  total: number
): MatchSkillsToProjectsOutput[] =>
  Array.from({ length: total }, () => matchNodesToProjectRolesMock());
