import { UserContext } from "@eden/package-context";
import { ServerTemplate } from "@eden/package-graphql/generated";
import { Avatar, TextHeading3 } from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
};

export interface ICommonServerAvatarListProps {
  label?: string;
  serverID?: string[];
  size?: "xs" | "sm" | "md";
}

export const CommonServerAvatarList = ({
  label,
  serverID,
  size = "sm",
}: ICommonServerAvatarListProps) => {
  const { memberServers } = useContext(UserContext);

  if (!memberServers) return null;

  // find _id in memberServers that match with serverIDs
  const filteredMemberServers = memberServers.filter((server) =>
    serverID?.includes(server?._id ?? "")
  );

  return (
    <div>
      <TextHeading3
        style={{ fontWeight: 700 }}
        className="mb-2 text-sm uppercase text-gray-500"
      >
        {label}
      </TextHeading3>
      <div className={`flex w-full flex-nowrap`}>
        {filteredMemberServers?.map((avatar, index: number) => (
          <div
            key={index}
            className={`${size === "xs" ? "-mr-3" : ""} ${
              size === "sm" ? "-mr-4" : ""
            } ${size === "md" ? "-mr-6" : ""}`}
          >
            <AvatarItem server={avatar} size={size} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface AvatarItemProps {
  server: ServerTemplate;
  size?: "xs" | "sm" | "md";
}

const AvatarItem = ({ server, size }: AvatarItemProps) => {
  const [isHoverServer, setIsHoverServer] = useState("");
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <div
        data-tip={isHoverServer}
        data-for={`serverTip-${server?._id}`}
        onMouseEnter={() => {
          setIsHoverServer(`${server?.name}`);
        }}
        onMouseLeave={() => {
          setIsHoverServer("");
        }}
      >
        <Avatar
          size={size}
          src={server?.serverAvatar ?? ""}
          alt={server?.name ?? "avatar"}
        />
      </div>
      <ReactTooltip id={`serverTip-${server?._id}`} place="top" effect="solid">
        {isHoverServer}
      </ReactTooltip>
    </>
  );
};
