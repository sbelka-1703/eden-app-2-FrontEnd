import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <section className="bg-bgGrey min-h-screen">
      <div className="mx-auto w-full max-w-screen-xl">
        <Header />
        <div className="relative z-20 mx-6">
          <main>{children}</main>
        </div>
      </div>
    </section>
  );
};

export default Layout;
