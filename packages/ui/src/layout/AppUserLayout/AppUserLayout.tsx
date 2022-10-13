// import { UserContext } from "@eden/package-context";
// import { useRouter } from "next/router";
// import { useContext } from "react";
import { AppHeader } from "@eden/package-ui";
import Head from "next/head";

interface IAppUserLayoutProps {
  children: React.ReactNode;
  logoLink?: string;
}

export const AppUserLayout = ({
  children,
  logoLink = `/projects`,
}: IAppUserLayoutProps) => {
  // const router = useRouter();
  // const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);
  // if (currentUser) {
  //   if (!currentUser?.onbording?.signup) router.push(`/signup`);
  // }

  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader logoLink={logoLink} inApp />
        <main className="flex flex-grow">{children}</main>
      </div>
    </>
  );
};

export default AppUserLayout;
