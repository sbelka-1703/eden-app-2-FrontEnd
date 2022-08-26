/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <button
      className="bg-soilGreen-700 hover:bg-soilGreen-500 relative rounded-full px-7 py-2 transition-all duration-300"
      onClick={() => {
        if (session) {
          signOut();
        } else {
          signIn("discord");
        }
      }}
    >
      <div className="flex items-center justify-start gap-2">
        {session && (
          <div className="absolute top-0 left-0 h-10 w-10 overflow-hidden rounded-full">
            <img
              className="h-full w-full"
              src={session?.user?.image ? session?.user?.image : "/random.jpg"}
              alt="avatar"
            />
          </div>
        )}
        <h1 className={`${session ? "ml-5" : "ml-0"} font-semibold`}>
          {session?.user ? session?.user?.name : "Login"}
        </h1>
      </div>
    </button>
  );
};
