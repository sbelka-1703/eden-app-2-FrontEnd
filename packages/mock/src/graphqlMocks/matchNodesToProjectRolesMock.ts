import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";

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
    commonSkills: getSkillsTypeMockArray(10),
    projectRoles: getMatchProjectRolesTypeMockArray(8),
  });

export const matchNodesToProjectRolesMockArray = (
  total: number
): MatchSkillsToProjectsOutput[] =>
  Array.from({ length: total }, () => matchNodesToProjectRolesMock());
