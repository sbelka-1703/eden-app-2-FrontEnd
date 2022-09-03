import Link from "next/link";
import { useRouter } from "next/router";
// import BurgerMenu from "./BurgerMenu";
// import WhatIsSoil from "./WhatIsSoil";
import { LoginButton } from "ui";

export const AppHeader = ({}) => {
  const router = useRouter();

  return (
    <header className="z-10 border-b bg-white shadow-lg shadow-slate-500/10">
      <nav className="h-16 w-full px-4  sm:px-5 lg:px-6" aria-label="Top">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
          {router?.route === "/" ? (
            <div>
              <span className="text-xl">🌱</span>
              <span className="text-darkGreen ml-2 text-2xl font-bold">
                Eden.
              </span>
            </div>
          ) : (
            <Link href="/projects">
              <a>
                <span className="text-xl">🌱</span>
                <span className="text-darkGreen ml-2 text-2xl font-bold">
                  Eden.
                </span>
              </a>
            </Link>
          )}
          <LoginButton />
        </div>
      </nav>
    </header>
  );
};
