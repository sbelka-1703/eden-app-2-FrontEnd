import {
  Maybe,
  Members,
  ServerTemplate,
} from "@eden/package-graphql/generated";
import { createContext, Dispatch } from "react";

type userProfile = Members;

export interface UserContextType {
  currentUser?: userProfile;
  memberFound: boolean;
  setCurrentUser: Dispatch<userProfile>;
  refechProfile: () => void;
  memberServers: any;
  selectedServer: Maybe<ServerTemplate>;
  setSelectedServer: Dispatch<string>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  memberFound: false,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
  memberServers: undefined,
  selectedServer: {},
  // eslint-disable-next-line no-empty-function
  setSelectedServer: () => {},
});
