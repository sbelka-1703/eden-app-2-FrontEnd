import { GridItemEight, GridItemTwo, GridLayout } from "@eden/package-ui";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export interface ILoginSectionProps {
  image?: string;
}

export const LoginSection = ({ image }: ILoginSectionProps) => {
  return (
    <div
      className={`grid h-screen content-center `}
      style={{
        backgroundImage:
          "linear-gradient(120.91deg, #022A00 18.23%, #071B08 92.68%)",
      }}
    >
      <GridLayout>
        <GridItemTwo> </GridItemTwo>
        <GridItemEight>
          <div className={`flex`}>
            <h1
              className={`font-poppins text-accentColor text-landingTitleSM lg:text-landingTitle mt-4 text-6xl font-bold tracking-tight sm:mt-5 lg:mt-6`}
            >
              eden
            </h1>
            <div
              className={`lg:text-landingSubtitle pl-2 text-left text-2xl font-bold text-white `}
            >
              <div className={`mt-6 lg:mt-20`}>prot</div>
              <div className={`-mt-3 lg:mt-8`}>
                ocol<span className={`text-accentColor`}>.</span>
              </div>
            </div>
          </div>
          <div
            className={`h-5/10 relative w-full rounded-3xl border-2 border-white p-6 shadow-lg`}
            style={{
              backgroundImage:
                "linear-gradient(143.35deg, rgba(255, 255, 255, 0.61) 6.04%, rgba(255, 255, 255, 0.28) 101.32%)",
            }}
          >
            <div
              className={`text-darkGreen mt-4 text-center text-2xl font-semibold`}
            >
              ⚡️ Signin before continuing!
            </div>
            <div className={`flex w-full justify-center`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={``}
                className={`-mt-4 h-60 w-60 sm:-mt-2 md:mt-6`}
              />
            </div>

            <div className={`flex w-full justify-center`}>
              <button
                className={`text-darkGreen absolute bottom-8 flex rounded-full border border-white bg-white/50 p-1.5 font-medium hover:bg-white/60`}
                onClick={() => signIn("discord")}
              >
                <span className={`rounded-full bg-blue-600 p-1`}>
                  <FaDiscord size={`1.5em`} color={`#ffffff`} />
                </span>
                <span className={`my-auto pl-2 pr-4`}>Login with Discord</span>
              </button>
            </div>
          </div>
        </GridItemEight>
        <GridItemTwo> </GridItemTwo>
      </GridLayout>
    </div>
  );
};
