// import { useRouter } from "next/router";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
export interface ISocialMediaCompProps {
  twitterHandle?: string;
  linkedInHandle?: string;
  discordHandle?: string;
  gitHubHandle?: string;
}

export const SocialMediaComp = ({
  twitterHandle,
  linkedInHandle,
  discordHandle,
  gitHubHandle,
}: ISocialMediaCompProps) => {
  // const router = useRouter();

  return (
    <div>
      <div className="text-lg font-semibold tracking-widest subpixel-antialiased">
        SOCIALS
      </div>
      <div className="my-2">
        <div className={`flex flex-row`}>
          <div className="p-2">
            <a
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size="50px" color="#BCBCBC" />
            </a>
          </div>
          <div className="p-2">
            <a
              href={`https://www.linkedin.com/in/${linkedInHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size="50px" color="#BCBCBC" />
            </a>
          </div>
        </div>
        <div className={`flex flex-row`}>
          <div className="p-2">
            <a
              href={`https://discord.com/channels/@${discordHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord size="50px" color="#BCBCBC" />
            </a>
          </div>
          <div className="p-2">
            <a
              href={`https://github.com/${gitHubHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size="50px" color="#BCBCBC" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
