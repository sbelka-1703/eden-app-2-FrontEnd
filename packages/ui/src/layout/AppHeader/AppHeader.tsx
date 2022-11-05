// import { useRouter } from "next/router";
import { LoginButton } from "@eden/package-ui";
import Link from "next/link";

export interface IAppHeaderProps {
  logoLink?: string;
  inApp?: boolean;
}

export const AppHeader = ({ logoLink, inApp }: IAppHeaderProps) => {
  // const router = useRouter();

  return (
    <header className="z-10 border-b bg-white shadow-lg shadow-slate-500/10">
      <nav className="h-16 w-full px-4  sm:px-5 lg:px-6" aria-label="Top">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
          {!logoLink ? (
            <div>
              <span className="text-xl">🌱</span>
              <span className="text-darkGreen ml-2 text-2xl font-bold">
                Eden.
              </span>
              <span className={`text-darkGreen/50 pl-6 text-xs`}>alpha</span>
            </div>
          ) : (
            <Link href={`${logoLink}`}>
              <span className="text-xl">🌱</span>
              <span className="text-darkGreen ml-2 text-2xl font-bold">
                Eden.
              </span>
            </Link>
          )}
          <LoginButton inApp={inApp} />
        </div>
      </nav>
    </header>
  );
};
