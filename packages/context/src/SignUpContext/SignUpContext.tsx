import { createContext, Dispatch } from "react";

export interface SignUpContextType {
  profileBio: string;
  setProfileBio: Dispatch<string>;
  hoursPerWeek: number;
  setHoursPerWeek: Dispatch<number>;
  timezone: string;
  setTimezone: Dispatch<string>;
  contentInterest: string;
  setContentInterest: Dispatch<string>;
  contentMostProud: string;
  setContentMostProud: Dispatch<string>;
  contentShowcaseAbility: string;
  setContentShowcaseAbility: Dispatch<string>;
}

export const SignUpContext = createContext<SignUpContextType>({
  profileBio: "",
  // eslint-disable-next-line no-empty-function
  setProfileBio: () => {},
  hoursPerWeek: 0,
  // eslint-disable-next-line no-empty-function
  setHoursPerWeek: () => {},
  timezone: "",
  // eslint-disable-next-line no-empty-function
  setTimezone: () => {},
  contentInterest: "",
  // eslint-disable-next-line no-empty-function
  setContentInterest: () => {},
  contentMostProud: "",
  // eslint-disable-next-line no-empty-function
  setContentMostProud: () => {},
  contentShowcaseAbility: "",
  // eslint-disable-next-line no-empty-function
  setContentShowcaseAbility: () => {},
});
