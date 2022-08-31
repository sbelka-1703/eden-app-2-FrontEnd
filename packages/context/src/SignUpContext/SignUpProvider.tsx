import React, { useState } from "react";

import { SignUpContext } from "./SignUpContext";

export interface SignUpProviderProps {
  children: React.ReactNode;
}

export const SignUpProvider = ({ children }: SignUpProviderProps) => {
  const [profileBio, setProfileBio] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(0);
  const [timezone, setTimezone] = useState("");
  const [contentInterest, setContentInterest] = useState("");
  const [contentMostProud, setContentMostProud] = useState("");
  const [contentShowcaseAbility, setContentShowcaseAbility] = useState("");

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
  };

  return (
    <SignUpContext.Provider value={injectContext}>
      {children}
    </SignUpContext.Provider>
  );
};
