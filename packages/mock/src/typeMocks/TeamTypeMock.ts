import { Team } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getMemberArray } from "../graphqlMocks/MembersMock";

export const getTeamTypeMock = (): Team => ({
  _id: String(faker.random.numeric(5)),
  name: faker.name.firstName(),
  champion: getMemberArray(Number(faker.random.numeric(1))),
  description: faker.lorem.paragraph(),
  members: getMemberArray(Number(faker.random.numeric(2))),
  serverID: ["996558082098339953"],
});

export const getTeamTypeMockArray = (total: number): Team[] =>
  Array.from({ length: total }, () => getTeamTypeMock());
