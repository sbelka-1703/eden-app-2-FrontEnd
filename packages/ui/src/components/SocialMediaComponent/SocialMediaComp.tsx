import { LinkType, Maybe } from "@graphql/eden/generated";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
export interface ISocialMediaCompProps {
  links?: Maybe<Array<Maybe<LinkType>>>;
}

export const SocialMediaComp = ({ links }: ISocialMediaCompProps) => {
  const [twitterUrl, setTwitterUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [notionLink, setNotionLink] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (links) {
      const twitter = links.find((link) => link?.name === "twitter");

      if (twitter) setTwitterUrl(twitter.url ?? "");

      const discord = links.find((link) => link?.name === "discord");

      if (discord) setDiscordUrl(discord.url ?? "");
      const gitHub = links.find((link) => link?.name === "github");

      if (gitHub) setGithubUrl(gitHub.url ?? "");
      const telegram = links.find((link) => link?.name === "telegram");

      if (telegram) setTelegramUrl(telegram.url ?? "");
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
        {twitterUrl && (
          <div>
            <a href={`${twitterUrl}`} target="_blank" rel="noreferrer">
              <FaTwitter size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {telegramUrl && (
          <div>
            <a href={`${telegramUrl}`} target="_blank" rel="noreferrer">
              <FaTelegram size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {discordUrl && (
          <div>
            <a href={`${discordUrl}`} target="_blank" rel="noreferrer">
              <FaDiscord size="2rem" color="#BCBCBC" />
            </a>
          </div>
        )}
        {githubUrl && (
          <div>
            <a href={`${githubUrl}`} target="_blank" rel="noreferrer">
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
