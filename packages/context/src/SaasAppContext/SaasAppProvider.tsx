import React, { useState } from "react";

import { SaasAppContext, SaasAppContextType } from "./SaasAppContext";

export interface SaasAppProviderProps {
  children: React.ReactNode;
}

export const SaasAppProvider = ({ children }: SaasAppProviderProps) => {
  const [showFullCandidatesTable, setShowFullCandidatesTable] =
    useState<boolean>(true);

  const [selectedCandidateID, setSelectedCandidateID] = useState<string>("");

  const injectContext: SaasAppContextType = {
    showFullCandidatesTable,
    setShowFullCandidatesTable,
    selectedCandidateID,
    setSelectedCandidateID,
  };

  return (
    <SaasAppContext.Provider value={injectContext}>
      {children}
    </SaasAppContext.Provider>
  );
};
