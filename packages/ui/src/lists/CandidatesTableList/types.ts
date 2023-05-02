export interface Candidate {
  _id: number;
  name: string;
  avatar: string;
  score: number;
  role?: string;
  background?: any[];
  level?: string;
  usdcHour?: number;
  responseRate?: number;
}

export interface Question {
  _id: string;
  content: string;
  bestAnswer: string;
}
