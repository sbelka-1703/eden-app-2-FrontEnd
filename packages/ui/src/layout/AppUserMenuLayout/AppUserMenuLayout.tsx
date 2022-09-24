import { useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
import Head from "next/head";
// import { useRouter } from "next/router";
import { useContext } from "react";
import {
  AppHeader,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  RecommendedList,
  UserProfileMenu,
} from "ui";

export interface IAppUserMenuLayoutProps {
  children: React.ReactNode;
  recommnededSidebar?: boolean;
}

export const AppUserMenuLayout = ({
  children,
  recommnededSidebar = true,
}: IAppUserMenuLayoutProps) => {
  // const router = useRouter();
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);
  // if (currentUser) {
  //   if (!currentUser?.onbording?.signup) router.push(`/signup`);
  // }

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
        <AppHeader logoLink={`/projects`} inApp />
        <main className="flex flex-grow">
          <GridLayout>
            <GridItemThree>
              <UserProfileMenu title={`Good Morning,`} />
            </GridItemThree>
            {recommnededSidebar ? (
              <>
                <GridItemSix>{children}</GridItemSix>
                <GridItemThree>
                  <RecommendedList
                    projects={
                      dataProjectsRecommended?.findProjects_RecommendedToUser
                    }
                  />
                </GridItemThree>
              </>
            ) : (
              <GridItemNine>{children}</GridItemNine>
            )}
          </GridLayout>
        </main>
      </div>
    </>
  );
};

export default AppUserMenuLayout;
