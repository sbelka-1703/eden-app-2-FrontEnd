import { LinkType, Maybe } from "@eden/package-graphql/generated";
import { useEffect } from "react";
// import { TextInputLabel } from "@eden/package-ui";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FaBriefcase,
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaQuestionCircle,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

type LinkValues = {
  links: { name: string; url: string }[];
};

export interface IFillSocialLinksProps {
  links?: Maybe<LinkType>[];
  onChange?: React.Dispatch<React.SetStateAction<LinkType[]>>;
}

export const FillSocialLinks = ({ links, onChange }: IFillSocialLinksProps) => {
  const filteredLinks = links?.map((link: any) => {
    // eslint-disable-next-line no-unused-vars
    const { __typename, ...rest } = link;

    return rest;
  });

  // const linkRemoveList = ["https://", "http://"];

  // const getLink = (url: string) => {
  //   const link = linkRemoveList.find((item) => url.includes(item));

  //   if (link) {
  //     return url.replace(link, "");
  //   }

  //   return url;
  // };

  const removeList = [
    "https://twitter.com/",
    "https://www.twitter.com/",
    "http://twitter.com/",
    "http://www.twitter.com/",
    "https://github.com/",
    "https://www.github.com/",
    "http://github.com/",
    "http://www.github.com/",
    "https://t.me/",
    "http://t.me/",
    "https://www.lensfrens.xyz/",
    "http://www.lensfrens.xyz/",
    "@",
    "https://",
    "http://",
  ];

  const getHandle = (url: string) => {
    const handle = removeList.find((item) => url.includes(item));

    if (handle) {
      return url.replace(handle, "");
    }
    return url;
  };

  const cleanLink = (linkName: string) => {
    const link = filteredLinks?.find((link) => link?.name === linkName);

    return { name: linkName, url: link?.url ? getHandle(link?.url) : "" };
  };

  const { register, control, watch } = useForm<LinkValues>({
    defaultValues: {
      links: [
        {
          ...(cleanLink("twitter")
            ? cleanLink("twitter")
            : { name: "twitter", url: "" }),
        },
        { ...(cleanLink("telegram") ?? { name: "telegram", url: "" }) },
        { ...(cleanLink("github") ?? { name: "github", url: "" }) },
        { ...(cleanLink("lens") ?? { name: "lens", url: "" }) },
        {
          ...(cleanLink("portfolio") ?? {
            name: "portfolio",
            url: "",
          }),
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    name: "links",
    control,
    rules: {},
  });

  useEffect(() => {
    const subscription = watch((data) => {
      const newLinks = data.links?.map((link: any) => {
        switch (link.name) {
          case "twitter":
            return {
              name: link.name,
              url: getHandle(link.url)
                ? `https://twitter.com/${getHandle(link.url)}`
                : "",
            };
          case "telegram":
            return {
              name: link.name,
              url: getHandle(link.url)
                ? `https://t.me/${getHandle(link.url)}`
                : "",
            };
          case "github":
            return {
              name: link.name,
              url: getHandle(link.url)
                ? `https://github.com/${getHandle(link.url)}`
                : "",
            };
          case "lens":
            return {
              name: link.name,
              url: getHandle(link.url)
                ? `https://www.lensfrens.xyz/${getHandle(link.url)}`
                : "",
            };
          case "portfolio":
            return {
              name: link.name,
              url: getHandle(link.url) ? `https://${getHandle(link.url)}` : "",
            };
          default:
            return link;
        }
      });

      onChange?.(newLinks as LinkType[]);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const platformIcons = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <FaTwitter size="24px" color="#00acee" />;
      case "discord":
        return <FaDiscord size="24px" color="#BCBCBC" />;
      case "github":
        return <FaGithub size="24px" color="#BCBCBC" />;
      case "linkedin":
        return <FaLinkedin size="24px" color="#0e76a8" />;
      case "telegram":
        return <FaTelegram size="24px" color="#BCBCBC" />;
      case "lens":
        return <LensIcon />;
      case "portfolio":
        return <FaBriefcase size="24px" color="#BCBCBC" />;
      default:
        return <FaQuestionCircle size="24px" color="#00acee" />;
    }
  };

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <section key={field.id}>
            {/* <TextInputLabel htmlFor={`link-${field.name}`}>
              {field.name}
            </TextInputLabel> */}
            <div className={`flex`}>
              <div className={`my-auto px-2`}>{platformIcons(field.name)}</div>

              <input
                id={`link-${field.name}`}
                className={`input-primary rounded-full pl-4`}
                type="text"
                placeholder={
                  field.name === "portfolio"
                    ? `your ${field.name} url`
                    : `${field.name} handle`
                }
                {...register(`links.${index}.url`)}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
};

const LensIcon = () => {
  return (
    <svg
      className="h-6 w-6 text-gray-900"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 450 450"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g id="default-picture">
          <rect
            xmlns="http://www.w3.org/2000/svg"
            id="default-picture-background"
            x="0"
            width="450"
            height="450"
            fill="#ABFE2C"
          />
          <g
            xmlns="http://www.w3.org/2000/svg"
            id="default-picture-logo"
            transform="translate(60,30)"
          >
            <path
              d="m171.3 315.6.1.2-.3-67a113.6 113.6 0 0 0 99.7 58.6 115 115 0 0 0 48.9-10.8l-5.8-10a103.9 103.9 0 0 1-120.5-25.5l4.3 2.9a77 77 0 0 0 77.9 1l-5.7-10-2 1.1a66.4 66.4 0 0 1-96.5-54c19-1.1-30.8-1.1-12 .1A66.4 66.4 0 0 1 60.9 255l-5.7 10 2.4 1.2a76.1 76.1 0 0 0 79.8-5 103.9 103.9 0 0 1-120.6 25.5l-5.7 9.9a115 115 0 0 0 138.5-32.2c3.8-4.8 7.2-10 10-15.3l.6 66.9v-.4h11Z"
              fill="#00501e"
            />
            <g id="ez1M8bKaIyB3_to" transform="translate(162 137.5)">
              <g>
                <g transform="translate(-165.4 -143.9)">
                  <path
                    d="M185 159.2c-2.4 6.6-9.6 12.2-19.2 12.2-9.3 0-17.3-5.3-19.4-12.4"
                    fill="none"
                    stroke="#00501e"
                    strokeWidth="8.3"
                    strokeLinejoin="round"
                  />
                  <g id="ez1M8bKaIyB6_to" transform="translate(160 136.6)">
                    <g transform="translate(0 -1.3)" fill="#00501e">
                      <path
                        d="M124.8 144.7a11.9 11.9 0 1 1-23.8 0 11.9 11.9 0 0 1 23.8 0Z"
                        transform="translate(-154.1 -145)"
                      />
                      <path
                        d="M209.5 144.7a11.9 11.9 0 1 1-23.8 0 11.9 11.9 0 0 1 23.8 0Z"
                        transform="translate(-155 -145)"
                      />
                    </g>
                  </g>
                  <path
                    d="M92.2 142.8c0-14.6 13.8-26.4 30.8-26.4s30.8 11.8 30.8 26.4M177 142.8c0-14.6 13.8-26.4 30.8-26.4s30.8 11.8 30.8 26.4"
                    fill="none"
                    stroke="#00501e"
                    strokeWidth="8.3"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </g>
            <path
              d="m219.1 70.3-3.2 3.3.1-4.6v-4.7c-1.8-65.4-100.3-65.4-102.1 0l-.1 4.7v4.6l-3.1-3.3-3.4-3.3C59.8 22-10 91.7 35 139.2l3.3 3.4C92.6 196.8 164.9 197 164.9 197s72.3-.2 126.5-54.4l3.3-3.4C339.7 91.7 270 22 222.5 67l-3.4 3.3Z"
              fill="none"
              stroke="#00501e"
              strokeWidth="11.2"
              strokeMiterlimit="10"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
