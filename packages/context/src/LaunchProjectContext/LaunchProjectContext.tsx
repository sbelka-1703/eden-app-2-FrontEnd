import { Maybe, RoleType } from "@graphql/eden/generated";
import { createContext, Dispatch } from "react";

export interface LaunchProjectContextType {
  projectName: string;
  setProjectName: Dispatch<string>;
  projectDescription: string;
  setProjectDescription: Dispatch<string>;
  projectRoles: Maybe<Array<Maybe<RoleType>>>;
  setProjectRoles: Dispatch<Maybe<Array<Maybe<RoleType>>>>;
  serverId: string;
  setServerId: Dispatch<string>;
  githubUrl: string;
  setGithubUrl: Dispatch<string>;
  discordUrl: string;
  setDiscordUrl: Dispatch<string>;
  notionUrl: string;
  setNotionUrl: Dispatch<string>;
  telegramUrl: string;
  setTelegramUrl: Dispatch<string>;
}

export const LaunchProjectContext = createContext<LaunchProjectContextType>({
  projectName: "",
  // eslint-disable-next-line no-empty-function
  setProjectName: () => {},
  projectDescription: "",
  // eslint-disable-next-line no-empty-function
  setProjectDescription: () => {},
  projectRoles: [],
  // eslint-disable-next-line no-empty-function
  setProjectRoles: () => {},
  serverId: "",
  // eslint-disable-next-line no-empty-function
  setServerId: () => {},
  githubUrl: "",
  // eslint-disable-next-line no-empty-function
  setGithubUrl: () => {},
  discordUrl: "",
  // eslint-disable-next-line no-empty-function
  setDiscordUrl: () => {},
  notionUrl: "",
  // eslint-disable-next-line no-empty-function
  setNotionUrl: () => {},
  telegramUrl: "",
  // eslint-disable-next-line no-empty-function
  setTelegramUrl: () => {},
});
