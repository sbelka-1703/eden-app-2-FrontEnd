import Head from "next/head";
import { AppHeader } from "ui";

export interface IAppPublicLayoutProps {
  children: React.ReactNode;
}

export const AppPublicLayout = ({ children }: IAppPublicLayoutProps) => {
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

export default AppPublicLayout;
