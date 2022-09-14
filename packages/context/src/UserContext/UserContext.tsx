import { Members } from "@graphql/eden/generated";
import { createContext, Dispatch } from "react";

type userProfile = Members;

export interface UserContextType {
  currentUser?: userProfile;
  memberFound: boolean;
  setCurrentUser: Dispatch<userProfile>;
  refechProfile: () => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  memberFound: false,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
});
