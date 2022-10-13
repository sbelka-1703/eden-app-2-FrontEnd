import { faker } from "@faker-js/faker";

import { getSkills } from "./MembersMock";
import { project } from "./ProjectMock";

export const getRoleTypeMock = () => ({
  id: project._id,
  archive: faker.datatype.boolean(),
  budget: project.budget,
  dateRangeEnd: "1662161995158",
  dateRangeStart: "1662161995158",
  description: project.description,
  keyRosponsibilities: faker.lorem.sentences(4),
  openPositions: faker.datatype.number({ min: 1, max: 10, precision: 1 }),
  skills: getSkills(5),
  tittle: project.title,
});
