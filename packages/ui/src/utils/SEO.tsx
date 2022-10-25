import Head from "next/head";
import React, { FC } from "react";

const DEFAULT_TITLE = process.env.NEXT_PUBLIC_ENV_BRANCH
  ? `Eden protocol - alpha - ${process.env.NEXT_PUBLIC_ENV_BRANCH}`
  : `Eden protocol - alpha`;
const DEFAULT_DESCRIPTION = `Together, let's build the perfect breeding ground for everyone to do work they love. Eden's talent coordination protocol is how.`;

const DEFAULT_IMAGE = `https://pbs.twimg.com/profile_images/1563942271170617344/4Tpfr8SY_400x400.jpg`;

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: FC<Props> = ({
  title = "",
  description = "",
  image = DEFAULT_IMAGE,
}) => {
  const appTitle = title + ` ` + DEFAULT_TITLE;
  const appDescription = description ? description : DEFAULT_DESCRIPTION;

  // console.log(appTitle);
  // console.log(appDescription);

  return (
    <Head>
      <meta property="og:site_name" content={`Eden protocol - alpha`} />
      <meta property="og:title" content={appTitle} />
      <meta property="og:description" content={appDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content={`Eden protocol - alpha`} />
      <meta property="twitter:title" content={appTitle} />
      <meta property="twitter:description" content={appDescription} />
      <meta property="twitter:image:src" content={image} />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta property="twitter:creator" content={`Eden protocol - alpha`} />
    </Head>
  );
};

export default SEO;
