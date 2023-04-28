import { gql } from "@apollo/client";

export const INTERVIEW_EDEN_AI = gql`
  query ($fields: interviewEdenAIInput!) {
    interviewEdenAI(fields: $fields) {
      reply
      questionAskingNow
      unansweredQuestions
      timesAsked
    }
  }
`;
