import { ChangeEvent } from "react";
import {
  FaDiscord,
  FaGithub,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";

enum Platforms {
  "twitter",
  "discord",
  "github",
  "notion",
  "telegram",
  "linkedin",
}

export interface ISocialMediaInputProps {
  platform: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SocialMediaInput = ({
  platform,
  placeholder,
  required = false,
  onChange,
}: ISocialMediaInputProps) => {
  return (
    <div className="mb-2 flex rounded-md py-2 shadow-md">
      <div className="px-2">
        {platform === "twitter" && <FaTwitter size="24px" color="#00acee" />}
        {platform === "discord" && <FaTelegram size="24px" color="#BCBCBC" />}
        {platform === "github" && <FaDiscord size="24px" color="#BCBCBC" />}
        {platform === "notion" && <FaGithub size="24px" color="#BCBCBC" />}
        {platform === "linkedin" && <FaLinkedin size="24px" color="#0e76a8" />}
        {platform === "telegram" && <SiNotion size="24px" color="#BCBCBC" />}
      </div>
      <input
        id={platform}
        name={platform}
        // value={value}
        type="url"
        required={required}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        className={`font-Inter text-soilBody focus:ring-soilGreen-500 block flex w-full border-l border-zinc-400/50 px-1 text-base focus:border-none focus:outline-transparent focus:ring focus:ring-opacity-50`}
      />
    </div>
  );
};
