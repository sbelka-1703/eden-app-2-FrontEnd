// import { PhaseType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { randomPercentage } from "./MatchSkillsToMembersMock";
import { getSkills } from "./MembersMock";
import { getProject, project } from "./ProjectMock";

export const getProjectRole = () => ({
  _id: project._id,
  title: project.title,
  description: project.description,
  keyRosponsibilities: faker.lorem.lines(),
  openPositions: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
  skills: getSkills(5),
  archive: faker.datatype.boolean(),
  dateRangeStart: "1662161995158",
  dateRangeEnd: "1662161995158",
  hoursPerWeek: faker.datatype.number({ min: 1, max: 168, precision: 1 }),
  budget: project.budget,
});

// export const getProjectRoles = () => ({
//   matchPercentage: randomPercentage(),

//   commonSkills: getSkills(5),
// });

export const MatchSkillsToProjects = () => ({
  matchPercentage: randomPercentage(),
  project: getProject(),
  commonSkills: getSkills(10),
  //   projectRoles: getProjectRoles()
});
