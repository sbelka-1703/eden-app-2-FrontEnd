import clsx from "clsx";
import { useState } from "react";

export interface AvatarProps {
  size?: "sm" | "md" | "lg";
  src?: string;
  alt?: string;
}

export const Avatar = ({ size = "md", src, alt = "avatar" }: AvatarProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const btnCls = clsx(
    "rounded-full shadow-lg inline-block overflow-hidden bg-gray-100",
    {
      "w-12 h-12": size === "sm",
      "w-16 h-16": size === "md",
      "w-20 h-20": size === "lg",
    }
  );

  // TODO: change fallback logic to use svg
  const fallbackSrc = "https://images.dog.ceo/breeds/cockapoo/bubbles1.jpg";

  return (
    <span className={btnCls}>
      {src ? (
        <img
          src={`${imageSrc}`}
          className=""
          alt={alt}
          onError={() => {
            if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
          }}
        />
      ) : (
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </span>
  );
};
