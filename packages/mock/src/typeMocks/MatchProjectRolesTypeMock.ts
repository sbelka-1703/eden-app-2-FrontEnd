import {
  MatchProjectRoles,
  Maybe,
  RoleType,
  Skills,
} from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { randomPercentage } from "../graphqlMocks";
import { getRoleTypeMock } from "./RoleTypeMock";

export const MatchProjectRolesTypeMock = () =>
  ({
    commonSkills: faker.helpers.uniqueArray(skills, 1)[0] as Maybe<Skills>,
    matchPercentage: randomPercentage(),
    projectRole: getRoleTypeMock() as Maybe<RoleType>,
  } as MatchProjectRoles);
