import { LinkType, Maybe } from "@graphql/eden/generated";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
export interface ISocialMediaCompProps {
  links?: Maybe<Array<Maybe<LinkType>>>;
}

export const SocialMediaComp = ({ links }: ISocialMediaCompProps) => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [gitHubHandle, setGitHubHandle] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [notionLink, setNotionLink] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (links) {
      const twitter = links.find((link) => link?.name === "twitter");

      if (twitter) setTwitterHandle(twitter.url ?? "");

      const discord = links.find((link) => link?.name === "discord");

      if (discord) setDiscordHandle(discord.url ?? "");
      const gitHub = links.find((link) => link?.name === "github");

      if (gitHub) setGitHubHandle(gitHub.url ?? "");
      const telegram = links.find((link) => link?.name === "telegram");

      if (telegram) setTelegramHandle(telegram.url ?? "");
      const notion = links.find((link) => link?.name === "notion");

      if (notion) setNotionLink(notion.url ?? "");
    }
  }),
    [links];

  // console.log("links", links);
  return (
    <div>
      <div
        className={`text-sm font-semibold tracking-widest subpixel-antialiased`}
      >
        SOCIALS
      </div>
      <div className={`mt-4 grid grid-cols-2 gap-4`}>
        {twitterHandle && (
          <div>
            <a
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {telegramHandle && (
          <div>
            <a
              href={`https://www.linkedin.com/in/${telegramHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTelegram size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {discordHandle && (
          <div>
            <a
              href={`https://discord.com/channels/@${discordHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {gitHubHandle && (
          <div>
            <a
              href={`https://github.com/${gitHubHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {notionLink && (
          <div>
            <a href={`${notionLink}`} target="_blank" rel="noreferrer">
              <SiNotion size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
