import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { getProject } from "../graphqlMocks";

export const getMatchSkillsToProjectsOutputMock =
  (): MatchSkillsToProjectsOutput => ({
    __typename: "matchSkillsToProjectsOutput",
    project: getProject(),
    matchPercentage: Number(faker.random.numeric(2)),
    commonSkills: faker.helpers.uniqueArray(skills, 1),
  });

export const getMatchSkillsToProjectsOutputMockArray = (
  total: number
): MatchSkillsToProjectsOutput[] =>
  Array.from({ length: total }, () => getMatchSkillsToProjectsOutputMock());
