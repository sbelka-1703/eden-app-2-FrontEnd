import { Members } from "@graphql/eden/generated";
import { createContext, Dispatch } from "react";

type userProfile = Members;

type UserContextType = {
  currentUser?: userProfile;
  setCurrentUser: Dispatch<userProfile>;
  refechProfile: () => void;
};

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
});
