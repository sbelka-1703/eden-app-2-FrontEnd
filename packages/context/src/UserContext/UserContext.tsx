import {
  Maybe,
  Members,
  ServerTemplate,
} from "@eden/package-graphql/generated";
import { createContext, Dispatch } from "react";

export interface UserContextType {
  currentUser?: Members;
  setCurrentUser: Dispatch<Members>;
  refechProfile: () => void;
  memberServers: ServerTemplate[];
  memberServerIDs: string[];
  selectedServer: Maybe<ServerTemplate>;
  setSelectedServer: Dispatch<string>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  refechProfile: () => {},
  memberServers: [],
  memberServerIDs: [],
  selectedServer: {},
  // eslint-disable-next-line no-empty-function
  setSelectedServer: () => {},
});
