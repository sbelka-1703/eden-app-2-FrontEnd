import { createContext } from "react";

import { GrantsModal } from "./GrantsProvider";
export interface GrantsContextType {
  openModal?: GrantsModal | null;
  setOpenModal?: any;
}

export const GrantsContext = createContext<GrantsContextType>({});
