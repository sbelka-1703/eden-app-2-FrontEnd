import { UserContext } from "@eden/package-context";
import { Avatar, CommonServerAvatarList } from "@eden/package-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";

export interface IServerFilterProps {}

export const ServerFilter = ({}: IServerFilterProps) => {
  const {
    memberServers,
    memberServerIDs,
    selectedServerID,
    setSelectedServerID,
  } = useContext(UserContext);
  const [expand, setExpand] = useState(false);
  const [allServers, setAllServers] = useState(false);

  const isAllServers = () => {
    return (
      memberServerIDs.length === selectedServerID.length &&
      memberServerIDs.every((value) => selectedServerID.includes(value))
    );
  };

  const isServerSelected = (serverID: string) => {
    return selectedServerID.includes(serverID);
  };

  const handleSelectServer = (serverID: string) => {
    if (isServerSelected(serverID)) {
      setSelectedServerID(selectedServerID.filter((id) => id !== serverID));
    } else {
      setSelectedServerID([...selectedServerID, serverID]);
    }
  };

  const handleSelectAll = () => {
    setAllServers(!allServers);
    if (!allServers) {
      setSelectedServerID(memberServerIDs);
    } else {
      setSelectedServerID([]);
    }
  };

  return (
    <>
      <div className={`flex justify-between`}>
        <CommonServerAvatarList
          label={`Active Servers`}
          serverID={selectedServerID}
          size="xs"
        />
        <div className={`my-auto`}>
          <p
            className="cursor-pointer text-center text-sm"
            onClick={() => setExpand(!expand)}
          >
            <span>
              {expand ? (
                <ChevronUpIcon width={16} className="ml-2 inline" />
              ) : (
                <ChevronDownIcon width={16} className="ml-2 inline" />
              )}
            </span>
          </p>
        </div>
      </div>
      {expand && (
        <fieldset className="space-y-4">
          <legend className="sr-only">Servers</legend>
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="all-servers"
                aria-describedby="all-servers-description"
                name="all-servers"
                type="checkbox"
                checked={isAllServers()}
                onChange={() => handleSelectAll()}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-4 text-md">
              <label
                htmlFor="all-servers"
                className="font-semibold text-gray-800"
              >
                All Servers
              </label>
            </div>
          </div>
          {memberServers?.map((server, index) => (
            <div key={index} className="relative flex items-start">
              <div className="flex h-5 items-center my-auto">
                <input
                  id={server.name || ""}
                  aria-describedby="comments-description"
                  name={server?.name || ""}
                  type="checkbox"
                  checked={isServerSelected(server?._id as string)}
                  onChange={() => handleSelectServer(server?._id as string)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className={`ml-4`}>
                <Avatar
                  isProject
                  size={`xs`}
                  src={server?.serverAvatar || ""}
                />
              </div>
              <div className="ml-3 text-sm my-auto">
                <label
                  htmlFor={server?.name || ""}
                  className="font-medium text-gray-700"
                >
                  {server.name}
                </label>
              </div>
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
};
