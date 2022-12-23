import { createContext } from "react";

import { GrantsModal } from "./GrantsProvider";
export interface GrantsContextType {
  openModal: GrantsModal | null;
  setOpenModal: React.Dispatch<React.SetStateAction<GrantsModal | null>>;
}

export const GrantsContext = createContext<GrantsContextType>({
  openModal: null,
  // eslint-disable-next-line no-empty-function
  setOpenModal: () => {},
});
