import { UserContext } from "@eden/package-context";
import { Avatar } from "@eden/package-ui";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useContext } from "react";

export interface IServerSelectButtonProps {
  inApp?: boolean;
}

export const ServerSelectButton = ({ inApp }: IServerSelectButtonProps) => {
  const { selectedServer, memberServers, setSelectedServer, memberFound } =
    useContext(UserContext);

  //   console.log("selectedServer", selectedServer);

  if (!selectedServer) return null;

  return (
    <div className="w-62 top-16 z-50 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {memberFound ? (
            <Menu.Button className="bg-soilGreen-700 hover:bg-soilGreen-500 inline-flex w-full justify-center rounded-full text-sm font-medium text-black/70 shadow hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex w-full justify-between">
                <div className={``}>
                  <Avatar
                    isProject
                    size={`xs`}
                    src={
                      selectedServer?.id
                        ? `https://cdn.discordapp.com/icons/${selectedServer?.id}/${selectedServer?.icon}.png`
                        : ""
                    }
                  />
                </div>
                <div className={`mx-5 my-auto font-semibold`}>
                  {selectedServer?.name || ""}
                </div>
                <ChevronDownIcon
                  className="hover:black my-auto ml-2 mr-2 h-5 w-5 "
                  aria-hidden="true"
                />
              </div>
            </Menu.Button>
          ) : null}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="text-semibold absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {inApp && (
                <>
                  {memberServers?.map((item: any, index: number) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedServer(item)}
                          className={`${
                            active ? "bg-zinc-700 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <Avatar
                            isProject
                            size={`xs`}
                            src={
                              item?.id
                                ? `https://cdn.discordapp.com/icons/${item?.id}/${item?.icon}.png`
                                : ""
                            }
                          />
                          <span className={`pl-4`}> {item?.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
