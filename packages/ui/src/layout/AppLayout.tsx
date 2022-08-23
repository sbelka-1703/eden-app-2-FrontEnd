import { AppHeader } from "./";

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <div className="bg-background flex h-screen min-w-0 flex-col lg:overflow-y-hidden">
      <AppHeader />
      <main className="flex flex-grow">{children}</main>
    </div>
  );
};

export default AppLayout;
