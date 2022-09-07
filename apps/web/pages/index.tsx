import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "ui";

export default function Web() {
  const router = useRouter();

  return (
    <div className={`flex h-screen overflow-hidden`}>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <main className="bg-darkGreen/80 flex w-full flex-grow pt-10 sm:pt-16 lg:pt-8 lg:pb-14">
        <div className="mx-auto w-full lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="font-poppins mt-4 text-6xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  Eden protocol
                </h1>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:mt-5 sm:text-2xl lg:mt-6 xl:text-3xl">
                  <span className="font-poppins">Community Power</span>
                  <span className="font-poppins text-accentColor pl-4  tracking-normal">
                    Unlocked
                  </span>
                </h3>
                <p className="font-Inter mt-3 text-base text-zinc-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Together, let&apos;s build the perfect breeding ground for
                  everyone to do work they love. Eden&apos;s talent coordination
                  protocol is how.
                </p>

                <div className="mt-10 sm:mt-12">
                  <div className="sm:flex">
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button
                        variant={`primary`}
                        onClick={() => router.push(`/projects`)}
                      >
                        Enter App
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0"></div>
          </div>
        </div>
      </main>
      <footer className="absolute inset-x-0 bottom-0 bg-white">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-500"
                rel="noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-4 md:order-1 md:mt-6">
            <p className="text-center text-base text-zinc-500">
              &copy; 2022 Eden protocol, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const navigation = [
  {
    name: "Twitter",
    href: "https://twitter.com/edenprotocolxyz",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  // {
  //   name: "GitHub",
  //   href: "#",
  //   icon: (props: any) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path
  //         fillRule="evenodd"
  //         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
];
