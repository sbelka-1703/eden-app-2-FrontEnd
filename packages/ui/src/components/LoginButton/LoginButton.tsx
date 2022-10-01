import { UserContext } from "@eden/package-context";
import { Avatar } from "@eden/package-ui";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { Fragment, useContext } from "react";
import { FaDiscord } from "react-icons/fa";

export interface ILoginButtonProps {
  inApp?: boolean;
}

export const LoginButton = ({ inApp }: ILoginButtonProps) => {
  const router = useRouter();
  const { currentUser, memberFound } = useContext(UserContext);

  return (
    <div className="top-16 z-50 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {memberFound ? (
            <Menu.Button className="bg-soilGreen-700 hover:bg-soilGreen-500 inline-flex w-full justify-center rounded-full text-sm font-medium text-black/70 shadow hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex w-full justify-between">
                <Avatar size={`xs`} src={currentUser?.discordAvatar || ""} />
                <div className={`mx-5 my-auto font-semibold`}>
                  {currentUser?.discordName || ""}
                </div>
                <ChevronDownIcon
                  className="hover:black my-auto ml-2 mr-2 h-5 w-5 "
                  aria-hidden="true"
                />
              </div>
            </Menu.Button>
          ) : (
            <button
              className={`text-darkGreen flex rounded-full border border-blue-400 bg-white/50 p-1.5 font-medium hover:border-blue-600 hover:bg-white/60`}
              onClick={() => signIn("discord")}
            >
              <span className={`rounded-full bg-blue-600 p-1`}>
                <FaDiscord size={`1em`} color={`#ffffff`} />
              </span>
              <span className={`my-auto pl-2 pr-4 text-sm`}>
                Login with Discord
              </span>
            </button>
          )}
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
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/profile`)}
                      className={`${
                        active ? "bg-zinc-700 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-zinc-700 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
