import { Epic, PhaseEpicType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getTeamTypeMockArray } from "../typeMocks/TeamTypeMock";
import { getMember } from "./MembersMock";
import { getProject } from "./ProjectMock";

const phase = ["archive", "open"];

export const getEpic = (): Epic => ({
  _id: String(faker.random.numeric(5)),
  name: faker.name.firstName(),
  description: faker.lorem.sentences(5),
  phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseEpicType,
  champion: getMember(),
  serverID: ["996558082098339953"],
  project: getProject(),
  teams: getTeamTypeMockArray(Number(faker.random.numeric(1))),
  author: getMember(),
  channelDiscordlID: faker.random.numeric(18),
});
