import { faker } from "@faker-js/faker";

import { nodes } from "../data";

export const getNodesTypeMockArray = (total: number) =>
  Array.from({ length: total }, () => {
    return {
      nodeData: faker.helpers.uniqueArray(nodes, 1)[0],
    };
  });
