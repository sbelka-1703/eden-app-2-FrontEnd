// import { FIND_MEMBER_INFO, FIND_NODES } from "@eden/package-graphql";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";

import { getMember } from "../graphqlMocks";
// import { getNodesTypeMockArray } from "../typeMocks";

export const apolloMocks = [
  {
    request: {
      operationName: "FIND_MEMBER_INFO",
      query: FIND_MEMBER_INFO,
      variables: {
        fields: {
          _id: "12345",
        },
      },
    },
    result: {
      data: {
        findMember: getMember(),
      },
    },
  },
  // WIP: This is not working yet
  //   {
  //     request: {
  //       operationName: "FIND_NODES",
  //       query: FIND_NODES,
  //       variables: {
  //         fields: {
  //           node: "typeProject",
  //         },
  //       },
  //     },
  //     result: {
  //       data: {
  //         findNodes: getNodesTypeMockArray(24),
  //       },
  //     },
  //   },
];
