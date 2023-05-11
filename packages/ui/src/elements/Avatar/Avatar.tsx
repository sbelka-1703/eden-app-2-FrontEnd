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
    "rounded-full shadow-md inline-block overflow-hidden bg-gray-100",
    {
      "w-8 h-8": size === "xs",
      "w-12 h-12": size === "sm",
      "w-16 h-16": size === "md",
      "w-20 h-20": size === "lg",
      "w-24 h-24": size === "xl",
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
          referrerPolicy="no-referrer"
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
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      className=" h-full w-full bg-pink-100"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      stroke="currentColor"
    >
      <g
        transform="translate(0.000000,400) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path d="M83 3993 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" />
        <path d="M3992 3860 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
        <path
          d="M1970 3090 c-128 -17 -277 -78 -265 -108 4 -9 30 -82 57 -162 28 -80
54 -149 58 -153 4 -4 15 14 25 40 53 140 169 288 219 281 54 -8 20 -104 -103
-293 -122 -186 -126 -255 -28 -393 l31 -43 12 41 c16 52 47 93 164 211 109
110 155 181 170 259 15 78 -3 177 -42 231 -52 72 -168 107 -298 89z"
        />
        <path
          d="M1210 2785 l-115 -115 40 -32 c22 -18 96 -82 164 -142 170 -148 281
-218 488 -307 l44 -19 -7 23 c-18 59 -137 290 -182 352 -57 81 -291 349 -306
353 -6 1 -63 -49 -126 -113z"
        />
        <path
          d="M2550 2780 c-178 -205 -236 -286 -304 -425 -72 -147 -83 -175 -65
-175 21 0 275 127 335 167 63 43 374 310 374 322 0 7 -223 231 -231 231 -2 0
-52 -54 -109 -120z"
        />
        <path
          d="M1062 2302 c-108 -39 -157 -122 -155 -263 2 -117 59 -311 96 -325 17
-6 338 106 332 116 -2 4 -31 17 -65 29 -68 25 -199 109 -230 148 -22 28 -36
70 -26 80 25 25 129 -17 266 -107 52 -35 118 -74 145 -86 88 -41 180 -27 270
42 40 30 44 44 15 44 -39 0 -84 33 -211 155 -152 146 -204 176 -312 182 -53 3
-86 -1 -125 -15z"
        />
        <path
          d="M2840 2246 c-80 -28 -154 -55 -165 -60 -16 -6 -3 -16 74 -52 111 -52
190 -109 221 -159 61 -99 -39 -86 -220 28 -174 111 -219 131 -280 131 -58 0
-113 -23 -178 -72 l-33 -25 56 -23 c44 -17 83 -48 178 -141 172 -166 258 -206
391 -182 112 20 172 73 197 172 15 63 6 202 -19 282 -21 65 -63 156 -71 154
-4 -1 -71 -24 -151 -53z"
        />
        <path
          d="M1935 2154 c-66 -34 -95 -79 -95 -146 0 -54 27 -106 71 -136 29 -20
44 -23 96 -20 55 3 67 8 98 38 84 81 64 214 -38 260 -51 24 -92 25 -132 4z"
        />
        <path
          d="M1665 1766 c-82 -40 -179 -95 -215 -121 -53 -40 -262 -218 -332 -284
-17 -15 -11 -23 100 -134 l118 -118 125 143 c146 167 187 220 241 311 34 59
128 258 128 272 0 11 -20 2 -165 -69z"
        />
        <path
          d="M2202 1748 c88 -199 141 -280 290 -448 51 -58 110 -125 131 -150 l37
-44 115 114 c63 63 115 118 115 123 0 5 -14 20 -32 35 -18 15 -91 78 -163 141
-133 116 -218 177 -315 226 -52 26 -208 95 -215 95 -2 0 15 -42 37 -92z"
        />
        <path
          d="M2020 1712 c0 -39 -43 -96 -170 -227 -123 -127 -159 -190 -167 -288
-15 -180 87 -287 272 -287 111 0 335 67 335 100 0 6 -26 85 -57 175 l-57 165
-52 -110 c-74 -155 -177 -260 -210 -215 -23 32 18 129 118 278 121 180 127
248 36 389 -35 55 -48 60 -48 20z"
        />
        <path d="M3992 140 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
        <path d="M83 3 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z" />
      </g>
    </svg>
  );
};
