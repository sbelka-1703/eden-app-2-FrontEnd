import {
  FIND_MEMBER_INFO,
  // FIND_NODES,
  FIND_ROLE_TEMPLATES,
} from "@eden/package-graphql";

import { findRoleTemplates, getMember } from "../graphqlMocks";
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
  {
    request: {
      operationName: "FIND_ROLE_TEMPLATES",
      query: FIND_ROLE_TEMPLATES,
      variables: {
        fields: {},
      },
    },
    result: {
      data: {
        findRoleTemplates: findRoleTemplates,
      },
    },
  },
  // WIP: This is not working yet
  // {
  //   request: {
  //     operationName: "FIND_NODES",
  //     query: FIND_NODES,
  //     variables: {
  //       fields: {
  //         // node: "typeProject",
  //       },
  //     },
  //   },
  //   result: {
  //     data: {
  //       findNodes: getNodesTypeMockArray(24),
  //     },
  //   },
  // },
];
