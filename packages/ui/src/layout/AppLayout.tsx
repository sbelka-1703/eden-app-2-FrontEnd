import { AppHeader } from "./";

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <div className="bg-background h-screen">
      <AppHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AppLayout;
