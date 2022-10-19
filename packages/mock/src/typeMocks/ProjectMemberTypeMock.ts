import { PhaseType, ProjectMemberType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { phase } from "../data";
import { getProject } from "../graphqlMocks";
import { getRoleTypeMock } from "./RoleTypeMock";

export const ProjectMemberTypeMock = () =>
  ({
    champion: faker.datatype.boolean(),
    favorite: faker.datatype.boolean(),
    info: getProject(),
    phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
    role: getRoleTypeMock(),
  } as ProjectMemberType);

//   export type ProjectMemberType = {
//     __typename?: 'projectMemberType';
//     champion?: Maybe<Scalars['Boolean']>;
//     favorite?: Maybe<Scalars['Boolean']>;
//     info?: Maybe<Project>;
//     phase?: Maybe<PhaseType>;
//     role?: Maybe<RoleType>;
//   };
