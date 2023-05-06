import { AppHeader } from "@eden/package-ui";

interface IAppUserLayoutProps {
  children: React.ReactNode;
  logoLink?: string;
}

export const AppUserLayout = ({
  children,
  logoLink = `/home`,
}: IAppUserLayoutProps) => {
  return (
    <>
      <div className="bg-background flex min-w-0 flex-col">
        <AppHeader logoLink={logoLink} inApp />
        <main className="relative flex flex-grow">{children}</main>
      </div>
    </>
  );
};

export default AppUserLayout;
