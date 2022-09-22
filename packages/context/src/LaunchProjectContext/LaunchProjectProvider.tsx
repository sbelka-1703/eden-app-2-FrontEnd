import { Maybe, RoleType } from "@graphql/eden/generated";
import React, { useState } from "react";

import { LaunchProjectContext } from "./LaunchProjectContext";

export interface LaunchProjectProviderProps {
  children: React.ReactNode;
}

export const LaunchProjectProvider = ({
  children,
}: LaunchProjectProviderProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectRoles, setProjectRoles] = useState<
    Maybe<Array<Maybe<RoleType>>>
  >([]);
  const [serverId, setServerId] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [notionUrl, setNotionUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");

  const injectContext = {
    projectName,
    setProjectName: (val: string) => setProjectName(val),
    projectDescription,
    setProjectDescription: (val: string) => setProjectDescription(val),
    projectRoles,
    setProjectRoles: (val: any) => setProjectRoles(val),
    serverId,
    setServerId: (val: string) => setServerId(val),
    githubUrl,
    setGithubUrl: (val: string) => setGithubUrl(val),
    discordUrl,
    setDiscordUrl: (val: string) => setDiscordUrl(val),
    notionUrl,
    setNotionUrl: (val: string) => setNotionUrl(val),
    telegramUrl,
    setTelegramUrl: (val: string) => setTelegramUrl(val),
  };

  return (
    <LaunchProjectContext.Provider value={injectContext}>
      {children}
    </LaunchProjectContext.Provider>
  );
};
