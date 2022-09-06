import { useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  AppHeader,
  GridItemSix,
  GridItemThree,
  GridLayout,
  RecommendedList,
  UserProfileMenu,
} from "ui";

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppUserMenuLayout = ({ children }: IAppLayoutProps) => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  if (currentUser) console.log("currentUser", currentUser);
  if (currentUser) {
    if (!currentUser?.onbording?.signup) router.push(`/signup`);
  }

  const { data: dataProjectsRecommended } = useQuery(
    FIND_PROJECTS_RECOMMENDED,
    {
      variables: {
        fields: {
          memberID: currentUser?._id,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader />
        <main className="flex flex-grow">
          <GridLayout>
            <GridItemThree>
              <UserProfileMenu title={`Good Morning,`} />
            </GridItemThree>
            <GridItemSix>{children}</GridItemSix>
            <GridItemThree>
              <RecommendedList
                projects={
                  dataProjectsRecommended?.findProjects_RecommendedToUser
                }
              />
            </GridItemThree>
          </GridLayout>
        </main>
      </div>
    </>
  );
};

export default AppUserMenuLayout;
