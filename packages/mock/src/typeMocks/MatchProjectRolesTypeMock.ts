import { MatchProjectRoles } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { randomPercentage } from "../utils";
import { getRoleTypeMock } from "./RoleTypeMock";

export const getMatchProjectRolesTypeMock = (): MatchProjectRoles => ({
  commonSkills: faker.helpers.uniqueArray(skills, 1),
  matchPercentage: randomPercentage(),
  projectRole: getRoleTypeMock(),
});

export const getMatchProjectRolesTypeMockArray = (
  total: number
): MatchProjectRoles[] =>
  Array.from({ length: total }, () => getMatchProjectRolesTypeMock());
