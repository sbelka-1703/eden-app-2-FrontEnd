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
  twitterHandle: string;
  setTwitterHandle: Dispatch<string>;
  githubHandle: string;
  setGithubHandle: Dispatch<string>;
  discordHandle: string;
  setDiscordHandle: Dispatch<string>;
  telegramHandle: string;
  setTelegramHandle: Dispatch<string>;
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
  twitterHandle: "",
  // eslint-disable-next-line no-empty-function
  setTwitterHandle: () => {},
  githubHandle: "",
  // eslint-disable-next-line no-empty-function
  setGithubHandle: () => {},
  discordHandle: "",
  // eslint-disable-next-line no-empty-function
  setDiscordHandle: () => {},
  telegramHandle: "",
  // eslint-disable-next-line no-empty-function
  setTelegramHandle: () => {},
});
