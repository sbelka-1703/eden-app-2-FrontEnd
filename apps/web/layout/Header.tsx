import Link from "next/link";
// import BurgerMenu from "./BurgerMenu";
// import WhatIsSoil from "./WhatIsSoil";

export default function Header() {
  return (
    <header className="mb-4 pt-16">
      <nav
        className="fixed top-0 left-0 z-30 h-16 w-screen bg-white px-4 shadow-md shadow-slate-500/10 sm:px-5 lg:px-6"
        aria-label="Top"
      >
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between">
          <Link href="/">
            <a>
              <span className="text-2xl">🌱</span>
              <span className="text-soilGreen-70 ml-2 text-xl font-bold">
                Soil.
              </span>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
