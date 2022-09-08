import { LinkType, Maybe } from "@graphql/eden/generated";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";
export interface ISocialMediaCompProps {
  links?: Maybe<Array<Maybe<LinkType>>>;
  title?: string;
  size?: string;
  color?: string;
}

export const SocialMediaComp = ({
  links,
  size = "2rem",
  color,
  title = "SOCIALS",
}: ISocialMediaCompProps) => {
  const [twitterUrl, setTwitterUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notionLink, setNotionLink] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (links) {
      const twitter = links.find((link) => link?.name === "twitter");
      const discord = links.find((link) => link?.name === "discord");
      const gitHub = links.find((link) => link?.name === "github");
      const telegram = links.find((link) => link?.name === "telegram");
      const notion = links.find((link) => link?.name === "notion");
      const linkedin = links.find((link) => link?.name === "linkedin");

      if (twitter) setTwitterUrl(twitter.url ?? "");
      if (discord) setDiscordUrl(discord.url ?? "");
      if (gitHub) setGithubUrl(gitHub.url ?? "");
      if (telegram) setTelegramUrl(telegram.url ?? "");
      if (notion) setNotionLink(notion.url ?? "");
      if (linkedin) setLinkedinUrl(linkedin.url ?? "");
    }
  }),
    [links];

  // console.log("links", links);
  return (
    <div>
      {title && (
        <div
          className={`mb-3 text-sm font-semibold tracking-widest subpixel-antialiased`}
        >
          {title}
        </div>
      )}
      <div className={`flex flex-wrap`}>
        {twitterUrl && (
          <div className="mr-2 mb-2">
            <a href={`${twitterUrl}`} target="_blank" rel="noreferrer">
              <FaTwitter size={size} color={color ? color : "#00acee"} />
            </a>
          </div>
        )}
        {telegramUrl && (
          <div className="mr-2 mb-2">
            <a href={`${telegramUrl}`} target="_blank" rel="noreferrer">
              <FaTelegram size={size} color={color ? color : "#BCBCBC"} />
            </a>
          </div>
        )}
        {discordUrl && (
          <div className="mr-2 mb-2">
            <a href={`${discordUrl}`} target="_blank" rel="noreferrer">
              <FaDiscord size={size} color={color ? color : "#BCBCBC"} />
            </a>
          </div>
        )}
        {githubUrl && (
          <div className="mr-2 mb-2">
            <a href={`${githubUrl}`} target="_blank" rel="noreferrer">
              <FaGithub size={size} color={color ? color : "#BCBCBC"} />
            </a>
          </div>
        )}
        {linkedinUrl && (
          <div className="mr-2 mb-2">
            <a href={`${githubUrl}`} target="_blank" rel="noreferrer">
              <FaLinkedin size={size} color={color ? color : "#0e76a8"} />
            </a>
          </div>
        )}
        {notionLink && (
          <div className="mr-2 mb-2">
            <a href={`${notionLink}`} target="_blank" rel="noreferrer">
              <SiNotion size={size} color={color ? color : "#BCBCBC"} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
