import { gql, useQuery } from "@apollo/client";
import {
  CandidateType,
  // SummaryQuestionType,
} from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  // Button,
  CandidateInfo,
  // CandidateModal,
  CandidatesTableList,
  // TrainQuestionsEdenAI,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../_app";

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
          experienceLevel {
            total
            years
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

type QuestionType = {
  _id: number;
  content: string;
  bestAnswer: string;
};

const CompanyCRM: NextPageWithLayout = () => {
  const router = useRouter();
  const { companyID } = router.query;

  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserScore, setSelectedUserScore] = useState<number | null>(
    null
  );
  const [selectedUserSummaryQuestions, setSelectedUserSummaryQuestions] =
    useState<any[]>([]);

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
    skip: !Boolean(companyID),
    ssr: false,
    onCompleted: (data: any) => {
      setCandidates(data.findCompany.candidates);

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

  const handleRowClick = (candidate: CandidateType) => {
    console.log({ candidate });
    setSelectedUserId(candidate.user?._id || "");
    setSelectedUserScore(candidate.overallScore || null);
    setSelectedUserSummaryQuestions(candidate.summaryQuestions || []);
    // router.push(`/company/${companyID}/candidate/${user.user?._id}`);
  };

  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      <div className="col-1">
        <div className="container m-4 border border-gray-500">
          <CandidatesTableList
            candidatesList={candidates}
            fetchIsLoading={findCompanyIsLoading}
            setRowObjectData={handleRowClick}
          />
        </div>
      </div>
      <div className="col-2">
        <div className="m-4 border border-gray-500 p-10">
          <CandidateInfo
            memberId={selectedUserId}
            percentage={selectedUserScore}
            loading={false}
            summaryQuestions={selectedUserSummaryQuestions}
          />
        </div>
      </div>
    </div>
  );
};

CompanyCRM.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CompanyCRM;
