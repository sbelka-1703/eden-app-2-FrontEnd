import { Rooms } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getMemberArray } from "../graphqlMocks/MembersMock";

export const getRoomTypeMock = (): Rooms => ({
  _id: String(faker.random.numeric(5)),
  name: faker.name.firstName(),
  avatar: faker.internet.avatar(),
  description: faker.lorem.sentences(5),
  hosts: getMemberArray(
    faker.datatype.number({ min: 1, max: 3, precision: 1 })
  ),
  members: getMemberArray(
    faker.datatype.number({ min: 2, max: 5, precision: 1 })
  ),
  //   registeredAt?: Maybe<Scalars["String"]>;
  serverID: faker.random.numeric(12),
});

export const getRoomTypeMockArray = (total: number): Rooms[] =>
  Array.from({ length: total }, () => getRoomTypeMock());
