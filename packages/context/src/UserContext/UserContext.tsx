import { Members } from "@eden/package-graphql/generated";
import { createContext, Dispatch } from "react";

type userProfile = Members;

export interface UserContextType {
  currentUser?: userProfile;
  memberFound: boolean;
  setCurrentUser: Dispatch<userProfile>;
  refechProfile: () => void;
  memberServers: any;
  setMemberServers: Dispatch<any>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  memberFound: false,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
  memberServers: undefined,
  // eslint-disable-next-line no-empty-function
  setMemberServers: () => {},
});
