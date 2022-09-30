import { Maybe, RoleType } from "@eden/package-graphql/generated";
import React, { useState } from "react";

import { LaunchContext } from "./LaunchContext";

export interface LaunchProviderProps {
  children: React.ReactNode;
}

export const LaunchProvider = ({ children }: LaunchProviderProps) => {
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
    <LaunchContext.Provider value={injectContext}>
      {children}
    </LaunchContext.Provider>
  );
};
