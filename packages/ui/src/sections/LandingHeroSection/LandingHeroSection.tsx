import { Button } from "@eden/package-ui";
import { useRouter } from "next/router";
import { FaTwitter } from "react-icons/fa";

export interface ILandingHeroSectionProps {
  image?: any;
}

export const LandingHeroSection = ({ image }: ILandingHeroSectionProps) => {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundImage:
          "linear-gradient(120.91deg, #022A00 18.23%, #071B08 92.68%)",
      }}
      className="flex w-full flex-grow pt-10 sm:pt-16 lg:pt-0 lg:pb-14"
    >
      <div className="mx-auto w-full lg:pl-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="z-10 mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
            <div className="lg:py-24">
              <div>
                <button
                  className={`flex rounded-full border border-white/50 bg-white/20 px-4 py-1 text-white hover:border-white/80`}
                  onClick={() =>
                    router.push("https://twitter.com/edenprotocolxyz")
                  }
                >
                  <span className={`pr-2`}>
                    <FaTwitter size={"1.5em"} color={"#00acee"} />
                  </span>
                  connect on Twitter
                </button>
              </div>
              <div className={` flex`}>
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

              <p className="font-Inter mt-3 text-base text-white/60 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                together, let&apos;s build the perfect breeding ground for
                everyone to do work they love.
              </p>
              <p className="font-Inter text-italic mt-3 text-xs  text-white/60 sm:mt-5 sm:text-xl lg:text-xs xl:text-xs">
                -alpha
              </p>

              <div className="mt-10 sm:mt-12">
                <div className="sm:flex">
                  <div className="mt-3 ml-8 sm:mt-0">
                    <Button
                      variant={`primary`}
                      onClick={() => router.push(`/home`)}
                    >
                      🚀 app
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-screen sm:-mb-48 lg:relative lg:m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`logo`} />
          </div>
        </div>
      </div>
    </main>
  );
};
