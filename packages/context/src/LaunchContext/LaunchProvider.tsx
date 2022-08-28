import React, { useState } from "react";

import { LaunchContext } from "./LaunchContext";

export interface LaunchProviderProps {
  children: React.ReactNode;
}

export const LaunchProvider = ({ children }: LaunchProviderProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  // const [projectRoles, setProjectRoles] = useState([]);

  const injectContext = {
    projectName,
    setProjectName: (val: string) => setProjectName(val),
    projectDescription,
    setProjectDescription: (val: string) => setProjectDescription(val),
    // projectRoles,
    // setProjectRoles: (val: string[]) => setProjectRoles(val),
  };

  return (
    <LaunchContext.Provider value={injectContext}>
      {children}
    </LaunchContext.Provider>
  );
};
