import { ChangeEvent } from "react";
import {
  FaDiscord,
  FaGithub,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import clsx from "clsx";

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
  value?: string;
  shape?: "rounded" | "square";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SocialMediaInput = ({
  platform,
  placeholder,
  required = false,
  value,
  shape = "square",
  onChange,
}: ISocialMediaInputProps) => {
  const outsideCls = clsx("flex py-2", {
    "": shape === "rounded",
    "rounded-md shadow-md mb-2": shape === "square",
  });
  const inputCls = clsx(" ", {
    "rounded-full focus:border-accentColor focus:ring-soilGreen-500 block w-full border border-zinc-400/50 ml-2 py-1 px-2 text-base shadow-sm focus:outline-transparent focus:ring focus:ring-opacity-50 disabled:text-slate-300":
      shape === "rounded",
    "border-l border-zinc-400/50 px-2 mr-4 font-Inter text-soilBody focus:ring-soilGreen-500 flex w-full text-base focus:border-none focus:outline-transparent focus:ring focus:ring-opacity-50":
      shape === "square",
  });

  return (
    <div className={`${outsideCls}`}>
      <div className="px-2">
        {platform === "twitter" && <FaTwitter size="24px" color="#00acee" />}
        {platform === "discord" && <FaDiscord size="24px" color="#BCBCBC" />}
        {platform === "github" && <FaGithub size="24px" color="#BCBCBC" />}
        {platform === "linkedin" && <FaLinkedin size="24px" color="#0e76a8" />}
        {platform === "telegram" && <FaTelegram size="24px" color="#BCBCBC" />}
        {platform === "notion" && <SiNotion size="24px" color="#BCBCBC" />}
      </div>
      <input
        id={platform}
        name={platform}
        value={value || ""}
        type="url"
        required={required}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        className={inputCls}
      />
    </div>
  );
};
