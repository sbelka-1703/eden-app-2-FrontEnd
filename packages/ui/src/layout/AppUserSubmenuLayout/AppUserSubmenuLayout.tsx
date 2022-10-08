import {
  AppHeader,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SubmenuSelector,
} from "@eden/package-ui";
import Head from "next/head";

export interface IAppUserSubmenuLayoutProps {
  children: React.ReactNode;
  showSubmenu?: boolean;
  submenu?: any;
}

export const AppUserSubmenuLayout = ({
  children,
  showSubmenu = true,
  submenu,
}: IAppUserSubmenuLayoutProps) => {
  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader logoLink={`/projects`} inApp />
        <main className="flex flex-grow">
          {showSubmenu ? (
            <GridLayout>
              <GridItemThree>
                <Card className="bg-white p-6">
                  <SubmenuSelector title={`Good Morning,`} submenu={submenu} />
                </Card>
              </GridItemThree>

              <GridItemNine>{children}</GridItemNine>
            </GridLayout>
          ) : (
            <>{children}</>
          )}
        </main>
      </div>
    </>
  );
};

export default AppUserSubmenuLayout;
