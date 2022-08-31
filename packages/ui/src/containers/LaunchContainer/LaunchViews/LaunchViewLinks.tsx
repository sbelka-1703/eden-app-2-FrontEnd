/* eslint-disable react/no-unescaped-entities */
import { LaunchContext } from "@context/eden";
import { ServerTemplate } from "@graphql/eden/generated";
import { useContext } from "react";
import {
  FaDiscord,
  FaGithub,
  // FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { Dropdown, TextField } from "ui";

export interface LaunchViewLinksProps {
  servers: ServerTemplate[];
}

export const LaunchViewLinks = ({ servers }: LaunchViewLinksProps) => {
  const {
    setServerId,
    githubUrl,
    setGithubUrl,
    discordUrl,
    setDiscordUrl,
    notionUrl,
    setNotionUrl,
    telegramUrl,
    setTelegramUrl,
  } = useContext(LaunchContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        PICK YOUR SERVER
      </div>
      <div className={`mt-4 flex justify-center`}>
        <div>
          <div className={`mx-auto w-40`}>
            <Dropdown
              items={servers}
              placeholder={`Select Your Server`}
              onSelect={(val) => setServerId(val._id)}
            />
          </div>
        </div>
      </div>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        SET UP COLLABORATION ENVIRONMENT
      </div>
      <p className={`my-4 text-center text-xs`}>
        Share links to the tools you'll be using for the project.
      </p>
      {/* <div className={`my-6 flex w-full`}>
        <FaTwitter size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Dework Link`}
          value={``}
          onChange={(e) => console.log(e.target.value)}
        />
      </div> */}
      <div className={`my-6 flex w-full`}>
        <FaGithub size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Github URL`}
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <FaDiscord size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Discord Link`}
          value={discordUrl}
          onChange={(e) => setDiscordUrl(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <SiNotion size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Notion Link`}
          value={notionUrl}
          onChange={(e) => setNotionUrl(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <FaTelegram size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Telegram Link`}
          value={telegramUrl}
          onChange={(e) => setTelegramUrl(e.target.value)}
        />
      </div>
    </div>
  );
};
