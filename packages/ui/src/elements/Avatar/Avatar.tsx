import clsx from "clsx";
import { useEffect, useState } from "react";

export interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
}

export const Avatar = ({ size = "md", src, alt = "avatar" }: AvatarProps) => {
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

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src]);

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
