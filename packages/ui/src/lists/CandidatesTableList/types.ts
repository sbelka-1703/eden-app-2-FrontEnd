interface Budget {
  perHour: number | null;
  __typename: string;
}

interface MemberRole {
  _id: string;
  title: string;
  __typename: string;
}

export enum NodeTypename {
  // eslint-disable-next-line no-unused-vars
  NodesType = "nodesType",
}

interface NodeElement {
  nodeData: NodeData;
  __typename: NodeTypename;
}

export interface PreviousProject {
  title: string;
  positionName: string | null;
  __typename: string;
}
export interface PreviousProject {
  title: string;
  positionName: string | null;
  __typename: string;
}
interface IUser {
  _id: string;
  discordName: string;
  discordAvatar: string;
  memberRole: MemberRole | null;
  budget: Budget;
  nodes: NodeElement[];
  previousProjects: PreviousProject[];
  __typename: string;
}

export interface ICandidate {
  overallScore: number | null;
  user: IUser;
  __typename: string;
  summaryQuestions: summaryQuestionType[];
  readyToDisplay: boolean;
}

type summaryQuestionType = {
  questionID: string;
  questionContent: string;
  answerContent: string;
  bestAnswerCompany: string | null;
  reason: string | null;
  score: number | null;
};

// eslint-disable-next-line no-unused-vars
enum NodeEnum {
  // eslint-disable-next-line no-unused-vars
  Category = "Category",
  // eslint-disable-next-line no-unused-vars
  Sector = "Sector",
  // eslint-disable-next-line no-unused-vars
  Skill = "Skill",
  // eslint-disable-next-line no-unused-vars
  SubSector = "SubSector",
}

export enum NodeDataTypename {
  // eslint-disable-next-line no-unused-vars
  Node = "Node",
}

interface NodeData {
  _id: string;
  name: string;
  node: NodeEnum;
  __typename: NodeDataTypename;
}
