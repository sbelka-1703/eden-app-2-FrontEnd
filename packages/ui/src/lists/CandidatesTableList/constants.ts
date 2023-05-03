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
export const candidatesListExample: CandidatesResponseData = {
  data: {
    findCompany: {
      _id: "644e052ca7177f51e7c27b77",
      candidates: [
        {
          user: {
            _id: "901188444057907310",
            discordName: "Dona Stevens",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/901188444057907310/99a904b9733bf9263feb7a73c7e0608f.png",
            hoursPerWeek: 20,
            nodes: [
              {
                nodeData: {
                  name: "Java",
                },
              },
              {
                nodeData: {
                  name: "JavaScript",
                },
              },
            ],
          },
          overallScore: 97,
          summaryQuestions: [],
        },
        {
          user: {
            _id: "361194148063215616",
            discordName: "Rick Wolowitz",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/361194148063215616/2ac1bd56b92fb209dc88a5a2d60e7ed2.png",
            hoursPerWeek: null,
            nodes: [
              {
                nodeData: {
                  name: "React",
                },
              },
              {
                nodeData: {
                  name: "TailwindCSS",
                },
              },
            ],
          },
          overallScore: 83,
          summaryQuestions: [],
        },
        {
          user: {
            _id: "908392557258604544",
            discordName: "Ying Mou Lee",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/908392557258604544/5472104b88b4876e3ad06803da45bee6.png",
            hoursPerWeek: 10,
            nodes: [
              {
                nodeData: {
                  name: "JavaScript",
                },
              },
              {
                nodeData: {
                  name: "CSS",
                },
              },
            ],
          },
          overallScore: 91,
          summaryQuestions: [],
        },
        {
          user: {
            _id: "901188444057907310",
            discordName: "Rebecca Singh",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/901188444057907310/99a904b9733bf9263feb7a73c7e0608f.png",
            hoursPerWeek: 20,
            nodes: [
              {
                nodeData: {
                  name: "Java",
                },
              },
              {
                nodeData: {
                  name: "JavaScript",
                },
              },
            ],
          },
          overallScore: 54,
          summaryQuestions: [],
        },
        {
          user: {
            _id: "361194148063215616",
            discordName: "Ostap Young",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/361194148063215616/2ac1bd56b92fb209dc88a5a2d60e7ed2.png",
            hoursPerWeek: null,
            nodes: [
              {
                nodeData: {
                  name: "React",
                },
              },
              {
                nodeData: {
                  name: "TailwindCSS",
                },
              },
            ],
          },
          overallScore: 69,
          summaryQuestions: [],
        },
        {
          user: {
            _id: "908392557258604544",
            discordName: "Garsan Shillou",
            discordAvatar:
              "https://cdn.discordapp.com/avatars/908392557258604544/5472104b88b4876e3ad06803da45bee6.png",
            hoursPerWeek: 10,
            nodes: [
              {
                nodeData: {
                  name: "JavaScript",
                },
              },
              {
                nodeData: {
                  name: "CSS",
                },
              },
            ],
          },
          overallScore: 47,
          summaryQuestions: [],
        },
      ],
    },
  },
};

function random(mn: number, mx: number) {
  return Math.random() * (mx - mn) + mn;
}

export const candidatesListFormatted =
  candidatesListExample.data.findCompany.candidates.map((candidate) => {
    return {
      _id: Number(candidate.user?._id!),
      avatar: candidate.user?.discordAvatar,
      name: candidate.user?.discordName,
      role: [
        "Project Manager",
        "Frontend Developer",
        "Backend Developer",
        "Scrum Master",
        "Blockchain Developer",
      ][Math.floor(random(0, 5))],
      score: candidate.overallScore,
      background: ["Ex-Meta", "Bankless", "Finance & Trading"],
      level: ["Junior", "Mid level", "Senior"][Math.floor(random(0, 3))],
      usdcHour: [90, 50, 40, 35, 30, 45, 80][Math.floor(random(0, 7))],
      responseRate: [3, 24, 10, 40, 0.5, 24][Math.floor(random(0, 6))],
    };
  });
