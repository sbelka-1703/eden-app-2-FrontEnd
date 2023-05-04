import { gql, useQuery } from "@apollo/client";
import { CandidateType } from "@eden/package-graphql/generated/graphqlEden";
import { AppUserLayout, Button, CandidatesTableList } from "@eden/package-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../_app";
import TrainQuestionsEdenAI from "./components/TrainQuestionsEdenAI";

const FIND_COMPANY = gql`
  query ($fields: findCompanyInput!) {
    findCompany(fields: $fields) {
      _id
      name
      candidates {
        overallScore
        user {
          _id
          discordName
          discordAvatar
          memberRole {
            _id
            title
          }
          budget {
            perHour
          }
          nodes {
            nodeData {
              _id
              name
              node
            }
          }
          previousProjects {
            title
            positionName
          }
        }
        readyToDisplay
        summaryQuestions {
          questionID
          questionContent
          answerContent
          reason
          score
          bestAnswerCompany
        }
      }
      questionsToAsk {
        bestAnswer
        question {
          _id
          content
        }
      }
    }
  }
`;

export interface CandidatesResponseData {
  data: Data;
}

export interface Data {
  findCompany: FindCompany;
}

export interface FindCompany {
  _id: string;
  name: string;
  candidates: CandidateType[];
  questionsToAsk: QuestionsToAsk[];
  __typename: string;
}

// export interface Candidate {
//   overallScore: number | null;
//   user: IUser;
//   __typename: string;
// }

export interface IUser {
  _id: string;
  discordName: string;
  discordAvatar: string;
  memberRole: MemberRole | null;
  budget: Budget;
  nodes: NodeElement[];
  previousProjects: PreviousProject[];
  __typename: string;
}

export interface Budget {
  perHour: number | null;
  __typename: string;
}

export interface MemberRole {
  _id: string;
  title: string;
  __typename: string;
}

export interface NodeElement {
  nodeData: NodeData;
  __typename: NodeTypename;
}

export enum NodeTypename {
  // eslint-disable-next-line no-unused-vars
  NodesType = "nodesType",
}

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

export interface NodeData {
  _id: string;
  name: string;
  node: NodeEnum;
  __typename: NodeDataTypename;
}

export enum NodeDataTypename {
  // eslint-disable-next-line no-unused-vars
  Node = "Node",
}

export interface PreviousProject {
  title: string;
  positionName: null;
  __typename: string;
}

export interface QuestionsToAsk {
  bestAnswer: null | string;
  question: Question;
  __typename: string;
}

export interface Question {
  _id: string;
  content: string;
  __typename: string;
}

// type Candidate = {
//   _id: number;
//   name: string;
//   avatar: string;
//   score: number;
//   role?: string;
//   background?: any[];
//   level?: string;
//   usdcHour?: number;
//   responseRate?: number;
// };

type QuestionType = {
  _id: number;
  content: string;
  bestAnswer: string;
};

// type Users = User[];

// const users: Users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@example.com",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     email: "janedoe@example.com",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   // Add more users as needed
// ];

// type CandidateType = {
//   _id: number;
//   name: string;
//   avatar: string;
//   score: number;
//   role?: string;
//   background?: any[];
//   level?: string;
//   usdcHour?: number;
//   responseRate?: number;
//   reason: string;
//   summaryQuestions: summaryQuestionType[];
// };
// type Users = User[];

// const users: Users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@example.com",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     email: "janedoe@example.com",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   // Add more users as needed
// ];

const CompanyCRM: NextPageWithLayout = () => {
  // interface MessageObject {
  //   message: string;
  //   sentMessage: boolean;
  //   user?: string;
  // }

  const router = useRouter();
  const { companyID } = router.query;

  // const [companyID] = useState<String>("644a5949e1ba07a9e9e3842c");
  const [candidates, setCandidates] = useState<CandidateType[]>([]); // DEV: type and name to <Candidate[]> ??
  // const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {
    // data: findCompanyData,
    loading: findCompanyIsLoading,
    // error: findCompanyError,
  } = useQuery(FIND_COMPANY, {
    variables: {
      fields: {
        _id: companyID,
      },
    },
    skip: !Boolean(companyID), // DEV: Simplified the comparisson to be boolean . before was: companyID == "" || companyID == null,  (note the "==" at least is on purpose)
    ssr: false,
    onCompleted: (data: any) => {
      setCandidates(data.findCompany.candidates);

      // setCandidates(
      //   data.findCompany.candidates.map((candidate: CandidateType) => {
      //     return {
      //       _id: parseInt(candidate.user!._id!),
      //       name: candidate.user!.discordName,
      //       avatar: candidate.user!.discordAvatar,
      //       score: candidate.overallScore, //
      //       usdcHour: candidate.user!.budget!.perHour,
      //       background: candidate.user!.previousProjects?.map(
      //         (project: any) => project.title
      //       ),
      //       role: candidate.user!.memberRole?.title,
      //       level: "Junior", // candidate.user...,
      //       responseRate: 15, // candidate.user.chat....
      //       // reason: candidate.summaryQuestions,
      //       summaryQuestions: candidate.summaryQuestions,
      //     };
      //   })
      // );

      const questionPrep: QuestionType[] = [];

      data.findCompany.questionsToAsk.map((question: any) => {
        console.log("question = ", question);
        if (question.question == null) {
        } else {
          questionPrep.push({
            _id: question.question._id,
            content: question.question.content,
            bestAnswer: question.bestAnswer,
          });
        }
        // return {
        //   _id: question.question._id,
        //   content: question.question.content,
        //   bestAnswer: question.bestAnswer,
        // };
      });

      setQuestions(questionPrep);
    },
  });

  const [selectedUser, setSelectedUser] = useState<CandidateType | null>(null);
  const [trainModalOpen, setTrainModalOpen] = useState(false);

  const handleRowClick = (user: CandidateType) => {
    setSelectedUser(user);
  };

  const handleTrainButtonClick = () => {
    setTrainModalOpen(true);
  };

  const handleCloseTrainModal = () => {
    setTrainModalOpen(false);
  };

  const handleCopyLink = () => {
    // const url = window.location.href;
    // const url = "http://localhost:3000/test/interviewEdenAIpage/" + companyID;
    const url = `${window.location.origin}/interview/${companyID}`;

    navigator.clipboard.writeText(url);
    setNotificationOpen(true);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Candidates
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleCopyLink}
        >
          Link Candidates Copy
        </button>
      </div>
      <CandidatesTableList
        candidatesList={candidates}
        fetchIsLoading={findCompanyIsLoading}
        setRowObjectData={handleRowClick}
      />
      <button
        className="mt-4 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
        onClick={handleTrainButtonClick}
      >
        Train EdenAI Dirty
      </button>
      <Button
        variant="secondary"
        onClick={() => {
          router.push(`/train-ai/${companyID}`);
        }}
      >
        Train AI
      </Button>
      {selectedUser && (
        <SelectedUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      {trainModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseTrainModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
              <TrainQuestionsEdenAI
                questions={questions}
                companyID={companyID}
                setQuestions={setQuestions}
                setTrainModalOpen={setTrainModalOpen}
              />
            </div>
          </div>
        </div>
      )}
      {notificationOpen && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 rounded-lg bg-green-500 px-4 py-2 text-white">
          Link copied!
        </div>
      )}
    </div>
  );
};

CompanyCRM.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CompanyCRM;

// type summaryQuestionType = {
//   questionID: number;
//   questionContent: string;
//   answerContent: string;
//   bestAnswerCompany: string;
//   // reason: string;
//   score: number;
// };

type Props = {
  selectedUser: CandidateType;
  setSelectedUser: React.Dispatch<React.SetStateAction<CandidateType | null>>;
};

const SelectedUser: React.FC<Props> = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        ></span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src={selectedUser?.user?.discordAvatar!}
                  alt={selectedUser?.user?.discordName!}
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="mb-4 text-2xl font-medium leading-6 text-black">
                  {selectedUser?.user?.discordName}
                </h3>
                <div className="mt-2">
                  <p className="inline-block rounded-lg px-4 py-2 text-4xl font-bold text-indigo-600 shadow-lg">
                    {selectedUser?.overallScore}
                    <span className="tooltip">
                      <svg
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19V12M12 8V8M12 4L12.01 4M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                        ></path>
                      </svg>
                      {/* <span className="tooltiptext">
                        {selectedUser?.reason}
                      </span> */}
                    </span>
                  </p>
                  {selectedUser?.summaryQuestions &&
                    selectedUser?.summaryQuestions?.map((question, index) => (
                      <div key={index}>
                        <p className="mb-2 mt-4 text-2xl font-medium leading-6 text-black">
                          {question?.questionContent}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Answer: {question?.answerContent}
                        </p>
                        {question?.score && (
                          <p className="inline-block rounded-lg px-4 py-2 text-lg font-bold text-indigo-400 shadow-xl">
                            Score: {question?.score}
                          </p>
                        )}
                        {/* {question.reason && (
                          <p className="text-sm text-gray-500">
                            Reason: {question.reason}
                          </p>
                        )} */}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px4 bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setSelectedUser(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
