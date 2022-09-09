/* eslint-disable @next/next/no-img-element */
import { useMutation, useQuery } from "@apollo/client";
import { ADD_NEW_MEMBER, FIND_MEMBER } from "@graphql/eden";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Avatar } from "ui";

export interface ILoginButtonProps {
  inApp?: boolean;
}

export const LoginButton = ({ inApp }: ILoginButtonProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [memberCreated, setMemberCreated] = useState(false);

  const { data: member, loading: memberLoading } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: session?.user?.id,
      },
    },
  });

  useEffect(() => {
    if (memberLoading === false) console.log("session========", member);
  }, [member, memberLoading]);

  const [addMember, {}] = useMutation(ADD_NEW_MEMBER);

  useEffect(() => {
    if (
      memberCreated === false &&
      member?.findMember === null &&
      memberLoading === false
    ) {
      console.log("this is runnning");
      addMember({
        variables: {
          fields: {
            _id: session?.user?.id,
            discordName: session?.user?.name,
            discordAvatar: session?.user?.image,
          },
        },
      });
      setMemberCreated(true);
      console.log("id created successfully");
    }
  }, [session, member?.findMember]);

  return (
    <div className="top-16 z-50 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {session ? (
            <Menu.Button className="bg-soilGreen-700 hover:bg-soilGreen-500 inline-flex w-full justify-center rounded-full text-sm font-medium text-black/70 shadow hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex w-full justify-between">
                <Avatar size={`xs`} src={session?.user?.image || ""} />
                <div className={`mx-5 my-auto font-semibold`}>
                  {session?.user ? session?.user?.name : "Login"}
                </div>
                <ChevronDownIcon
                  className="hover:black my-auto ml-2 mr-2 h-5 w-5 "
                  aria-hidden="true"
                />
              </div>
            </Menu.Button>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="bg-soilGreen-700 hover:bg-soilGreen-500 inline-flex w-full justify-center rounded-full text-sm font-medium text-black/70 shadow hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <div className={`flex w-full justify-between`}>
                <Avatar size={`xs`} src={``} />
                <div className={`mx-5 my-auto font-semibold`}>{`Login`}</div>
              </div>
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
