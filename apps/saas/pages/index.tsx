import { LandingHeroSection, SEO } from "@eden/package-ui";
import Head from "next/head";

import landingLogo from "../public/landing-logo.png";

export default function Web() {
  return (
    <>
      <SEO title={``} />
      <div className={`flex h-screen overflow-hidden`}>
        <Head>
          <title>Eden protocol</title>
        </Head>
        <LandingHeroSection image={landingLogo.src} />
      </div>
    </>
  );
}
