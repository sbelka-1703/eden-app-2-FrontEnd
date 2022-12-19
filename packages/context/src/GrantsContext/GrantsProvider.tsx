/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { GrantsContext } from "./GrantsContext";

export interface GrantsProviderProps {
  children: React.ReactNode;
}

export enum GrantsModal {
  START_WELCOME = "start welcome",
  NODES_ROLE = "nodes role",
  NODES_PROJECTS = "nodes projects",
  SKIP_ALERT = "skip alert",
  WARNING = "warning",
}

export const GrantsProvider = ({ children }: GrantsProviderProps) => {
  const [openModal, setOpenModal] = useState<GrantsModal | null>(null);

  const injectContext = {
    openModal: openModal,
    setOpenModal: setOpenModal,
  };

  return (
    <GrantsContext.Provider value={injectContext}>
      {children}
    </GrantsContext.Provider>
  );
};
