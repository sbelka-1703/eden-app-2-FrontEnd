import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";

import {
  getMatchProjectRolesTypeMockArray,
  getSkillsTypeMockArray,
} from "../typeMocks";
import { randomPercentage } from "../utils";
import { getProject } from "./ProjectMock";

export const MatchSkillsToProjects = (): MatchSkillsToProjectsOutput => ({
  matchPercentage: randomPercentage(),
  project: getProject(),
  commonSkills: getSkillsTypeMockArray(10),
  projectRoles: getMatchProjectRolesTypeMockArray(8),
});
