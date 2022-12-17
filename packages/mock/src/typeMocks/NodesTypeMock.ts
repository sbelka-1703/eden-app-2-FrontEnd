import { NodesType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { nodes } from "../data";

export const getNodesTypeMock = (): NodesType => {
  return {
    nodeData: faker.helpers.uniqueArray(nodes, 1)[0],
  };
};

export const getNodesTypeMockArray = (total: number): NodesType[] =>
  Array.from({ length: total }, () => getNodesTypeMock());
