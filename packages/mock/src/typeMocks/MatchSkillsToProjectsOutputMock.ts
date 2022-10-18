// export type MatchSkillsToProjectsOutput = {
//   __typename?: "matchSkillsToProjectsOutput";
//   commonSkills?: Maybe<Array<Maybe<Skills>>>;
//   matchPercentage?: Maybe<Scalars["Float"]>;
//   project?: Maybe<Project>;
//   projectRoles?: Maybe<Array<Maybe<MatchProjectRoles>>>;
// };

import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Skills,
} from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { getProject } from "../graphqlMocks";

export const getMatchSkillsToProjectsOutputMock = () =>
  ({
    __typename: "matchSkillsToProjectsOutput",
    project: getProject(),
    matchPercentage: Number(faker.random.numeric(2)),
    commonSkills: faker.helpers.uniqueArray(skills, 1)[0] as Maybe<Skills>,
  } as MatchSkillsToProjectsOutput);

export const getMatchSkillsToProjectsOutputMockArray = (total: number) =>
  Array.from({ length: total }, () => getMatchSkillsToProjectsOutputMock());
