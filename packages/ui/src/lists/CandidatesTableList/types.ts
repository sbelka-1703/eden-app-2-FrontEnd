export interface CandidatesResponseData {
  data: Data;
}

export interface Data {
  findCompany: FindCompany;
}

export interface FindCompany {
  _id: string;
  candidates: Candidate[];
}

export interface Candidate {
  user: User;
  overallScore: number;
  summaryQuestions: any[];
}

export interface User {
  _id: string;
  discordName: string;
  discordAvatar: string;
  hoursPerWeek: number | null;
  nodes: Node[];
}

export interface Node {
  nodeData: NodeData;
}

export interface NodeData {
  name: string;
}
