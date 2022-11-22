import { UserContext } from "@eden/package-context";
import React, { useContext, useState } from "react";

import { SignUpContext } from "./SignUpContext";

export interface SignUpProviderProps {
  children: React.ReactNode;
}

export const SignUpProvider = ({ children }: SignUpProviderProps) => {
  const { currentUser } = useContext(UserContext);

  const [profileBio, setProfileBio] = useState(currentUser?.bio || "");
  const [hoursPerWeek, setHoursPerWeek] = useState(
    currentUser?.hoursPerWeek || 0
  );
  const [timezone, setTimezone] = useState(currentUser?.timeZone || "");
  const [contentInterest, setContentInterest] = useState(
    currentUser?.content?.interest || ""
  );
  const [contentMostProud, setContentMostProud] = useState(
    currentUser?.content?.mostProud || ""
  );
  const [contentShowcaseAbility, setContentShowcaseAbility] = useState(
    currentUser?.content?.showCaseAbility || ""
  );
  const [twitterHandle, setTwitterHandle] = useState("");
  const [githubHandle, setGithubHandle] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");

  const injectContext = {
    profileBio,
    setProfileBio: (val: string) => setProfileBio(val),
    hoursPerWeek,
    setHoursPerWeek: (val: number) => setHoursPerWeek(val),
    timezone,
    setTimezone: (val: string) => setTimezone(val),
    contentInterest,
    setContentInterest: (val: string) => setContentInterest(val),
    contentMostProud,
    setContentMostProud: (val: string) => setContentMostProud(val),
    contentShowcaseAbility,
    setContentShowcaseAbility: (val: string) => setContentShowcaseAbility(val),
    twitterHandle,
    setTwitterHandle: (val: string) => setTwitterHandle(val),
    githubHandle,
    setGithubHandle: (val: string) => setGithubHandle(val),
    discordHandle,
    setDiscordHandle: (val: string) => setDiscordHandle(val),
    telegramHandle,
    setTelegramHandle: (val: string) => setTelegramHandle(val),
  };

  return (
    <SignUpContext.Provider value={injectContext}>
      {children}
    </SignUpContext.Provider>
  );
};
