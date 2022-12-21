import { PhaseType, ProjectMemberType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { phase } from "../data";
import { getRoleTypeMock } from "./";

export const getProjectMemberTypeMock = (): ProjectMemberType => ({
  champion: faker.datatype.boolean(),
  favorite: faker.datatype.boolean(),
  info: {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.sentences(5),
    descriptionOneLine: faker.lorem.sentence(),
    emoji: faker.internet.emoji(),
    backColorEmoji: faker.color.rgb({ prefix: "#" }),
    title: faker.name.firstName(),
    team: [
      {
        phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
        memberInfo: {
          _id: String(faker.random.numeric(5)),
        },
      },
      {
        phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
        memberInfo: {
          _id: String(faker.random.numeric(5)),
        },
      },
      {
        phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
        memberInfo: {
          _id: String(faker.random.numeric(5)),
        },
      },
      {
        phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
        memberInfo: {
          _id: String(faker.random.numeric(5)),
        },
      },
    ],
    dates: {
      complition: "1662161995158",
      kickOff: "1662161895158",
    },
  },
  role: getRoleTypeMock(),
});

export const getProjectMemberTypeMockArray = (
  total: number
): ProjectMemberType[] =>
  Array.from({ length: total }, () => getProjectMemberTypeMock());
