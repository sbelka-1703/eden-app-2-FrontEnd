import React, { useState } from "react";

import { SignUpContext } from "./SignUpContext";

export interface SignUpProviderProps {
  children: React.ReactNode;
}

export const SignUpProvider = ({ children }: SignUpProviderProps) => {
  const [profileBio, setProfileBio] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  // const [projectRoles, setProjectRoles] = useState([]);

  const injectContext = {
    profileBio,
    setProfileBio: (val: string) => setProfileBio(val),
    projectDescription,
    setProjectDescription: (val: string) => setProjectDescription(val),
    // projectRoles,
    // setProjectRoles: (val: string[]) => setProjectRoles(val),
  };

  return (
    <SignUpContext.Provider value={injectContext}>
      {children}
    </SignUpContext.Provider>
  );
};
