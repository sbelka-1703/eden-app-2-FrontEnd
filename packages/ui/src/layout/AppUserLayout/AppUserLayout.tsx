import { UserContext } from "@context/eden";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppHeader } from "ui";

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppUserLayout = ({ children }: IAppLayoutProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);
  if (currentUser) {
    if (!currentUser?.onbording?.signup) router.push(`/signup`);
  }

  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader />
        <main className="flex flex-grow">{children}</main>
      </div>
    </>
  );
};

export default AppUserLayout;
