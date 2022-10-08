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
  submenu?: boolean;
}

export const AppUserSubmenuLayout = ({
  children,
  submenu = true,
}: IAppUserSubmenuLayoutProps) => {
  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader logoLink={`/projects`} inApp />
        <main className="flex flex-grow">
          {submenu ? (
            <GridLayout>
              <GridItemThree>
                <Card className="bg-white p-6">
                  <SubmenuSelector title={`Good Morning,`} />
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
