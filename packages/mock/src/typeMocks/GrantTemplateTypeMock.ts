import { GrantTemplate } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getMemberArray } from "../graphqlMocks";
import { getNodesTypeMockArray } from "./";

export const getGrantTemplateTypeMockArray = (total: number) =>
  Array.from({ length: total }, () => {
    return {
      // nodeData: faker.helpers.uniqueArray(nodes, 1)[0],
    };
  });

// const requirements = (total: number) =>
//   Array.from({ length: total }, () => {
//     return {
//       faker.lorem.sentences(1)
//     };
//   });

export const getGrantTemplateTypeMock = () => {
  return {
    _id: String(faker.random.numeric(5)),
    name: faker.name.firstName(),
    smallDescription: faker.lorem.sentences(1),
    description: faker.lorem.sentences(5),
    avatar: faker.internet.avatar(),
    tags: ["Grants", "Travelling", "Events"],
    distributed: Number(faker.random.numeric(1)),
    maxDistributed: Number(faker.random.numeric(2)),
    amount: "1000 USDV",
    difficulty: "easy",
    applicationProcess: ["Apply", "Wait", "Get"],
    requirments: [
      faker.lorem.sentences(1),
      faker.lorem.sentences(1),
      faker.lorem.sentences(1),
      faker.lorem.sentences(1),
      faker.lorem.sentences(1),
    ],
    resources: [],
    nodes: getNodesTypeMockArray(
      faker.datatype.number({ min: 2, max: 36, precision: 1 })
    ),
    serverID: ["996558082098339953"],
    membersApplied: getMemberArray(
      faker.datatype.number({ min: 2, max: 36, precision: 1 })
    ),
  } as GrantTemplate;
};
