/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type QuestionType = {
  _id: number;
  content: string;
  bestAnswer: string;
};

export interface SaasAppContextType {
  showFullCandidatesTable: boolean;
  setShowFullCandidatesTable: Dispatch<SetStateAction<boolean>>;
  selectedCandidateID: string;
  setSelectedCandidateID: Dispatch<SetStateAction<string>>;
}

export const SaasAppContext = createContext<SaasAppContextType>({
  showFullCandidatesTable: true,
  setShowFullCandidatesTable: () => {},
  selectedCandidateID: "",
  setSelectedCandidateID: () => {},
});

SaasAppContext.displayName = "SaasAppContext";

export const useSaasAppContext = () => useContext(SaasAppContext);
