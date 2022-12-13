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
  activeIndex?: number;
  inApp?: boolean;
}

export const AppUserSubmenuLayout = ({
  children,
  showSubmenu = true,
  submenu,
  activeIndex,
  inApp = true,
}: IAppUserSubmenuLayoutProps) => {
  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
        <AppHeader logoLink={`/home`} inApp={inApp} />
        <main className="flex flex-grow">
          {showSubmenu ? (
            <GridLayout>
              <GridItemThree>
                <Card shadow className="bg-white p-6">
                  <SubmenuSelector
                    title={`Good Morning,`}
                    submenu={submenu}
                    activeIndex={activeIndex}
                  />
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
