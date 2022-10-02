import { PhaseType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";
import { phase } from "./data";
import { getMember } from "./MembersMock";
import { getProject } from "./ProjectMock";



export const getEpic = () =>
  ({
    _id: String(faker.random.numeric(5)),
    name: faker.name.firstName(),
    desciption: faker.lorem.sentences(5),
    phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
    champion: getMember(),
    serverID: faker.random.numeric(12),
    project: getProject(),
    channelDiscordlID: faker.random.numeric(18),
  } );


// export type Epic = {
//     __typename?: 'Epic';
//     _id?: Maybe<Scalars['ID']>;
//     author?: Maybe<Members>;
//     champion?: Maybe<Members>;
//     channelDiscordlID?: Maybe<Scalars['String']>;
//     description?: Maybe<Scalars['String']>;
//     members?: Maybe<Array<Maybe<Members>>>;
//     name?: Maybe<Scalars['String']>;
//     notifyUsers?: Maybe<Array<Maybe<Members>>>;
//     phase?: Maybe<PhaseEpicType>;
//     project?: Maybe<Project>;
//     serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
//     task?: Maybe<Array<Maybe<ProjectUpdate>>>;
//     teams?: Maybe<Array<Maybe<Team>>>;
//   };