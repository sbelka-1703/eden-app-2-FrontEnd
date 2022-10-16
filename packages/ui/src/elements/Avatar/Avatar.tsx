import clsx from "clsx";
import { useEffect, useState } from "react";

export interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
  isProject?: boolean;
  emoji?: string;
  backColorEmoji?: string;
}

export const Avatar = ({
  size = "md",
  src,
  alt = "avatar",
  isProject,
  emoji,
  backColorEmoji,
}: AvatarProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const btnCls = clsx(
    "rounded-full shadow-lg inline-block overflow-hidden bg-gray-100",
    {
      "w-8 h-8": size === "xs",
      "w-12 h-12": size === "sm",
      "w-16 h-16": size === "md",
      "w-20 h-20": size === "lg",
      "w-25 h-25": size === "xl",
    }
  );

  const avatarCls = clsx("text-center m-auto", {
    "text-2xl": size === "xs",
    "text-3xl": size === "sm",
    "text-4xl": size === "md",
    "text-5xl": size === "lg",
    "text-6xl": size === "xl",
  });

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src]);

  if (emoji) {
    return (
      <div
        className={`${btnCls} flex`}
        style={{
          backgroundColor: backColorEmoji,
        }}
      >
        <span className={avatarCls}>{emoji}</span>
      </div>
    );
  }

  return (
    <span className={btnCls}>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${imageSrc}`}
          className=""
          alt={alt}
          onError={() => {
            setImageSrc("");
          }}
        />
      ) : (
        <>{isProject ? project() : user()}</>
      )}
    </span>
  );
};

const user = () => {
  return (
    <svg
      className="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
};

const project = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    </svg>
  );
};
