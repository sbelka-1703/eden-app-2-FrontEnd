import {
  AppUserSubmenuLayout,
  Button,
  Card,
  Loading,
  TextBody,
  TextHeading2,
} from "@eden/package-ui";
import { useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const DMPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDMCheck = () => {
    console.log("check DM");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsError(true);
    }, 2000);
  };

  const handleDMcheckAgain = () => {
    console.log("check DM again");
    setIsLoading(true);

    setTimeout(() => {
      setIsError(false);
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleDone = () => {
    console.log("done");
    setIsSuccess(false);
  };

  if (isLoading) return <Loading title={`testing dm...`} />;

  return (
    <div className={`p-8`}>
      {!isError && !isSuccess && (
        <Card shadow className={`my-4 bg-white p-6 text-center`}>
          <TextHeading2>Lets test if your DM is open</TextHeading2>
          <TextBody>I will send you a DM on discord</TextBody>
          <div className={`my-4 w-full`}>
            <Button
              variant={`primary`}
              onClick={handleDMCheck}
              className={`w-full`}
            >
              Check DM
            </Button>
          </div>
        </Card>
      )}

      {isError && (
        <Card shadow className={`my-4 bg-white p-6 text-center`}>
          <TextHeading2>Sorry, there was an error</TextHeading2>
          <TextBody>Please check your privacy settings by:</TextBody>
          <TextBody>
            Right click on the server icon in the left navigation bar in Discord
          </TextBody>
          <TextBody>Click on Privacy Settings</TextBody>
          <TextBody>Open up Direct Message</TextBody>
          <div className={`my-4 w-full`}>
            <Button
              variant={`primary`}
              onClick={handleDMcheckAgain}
              className={`w-full`}
            >
              Check Again
            </Button>
          </div>
        </Card>
      )}

      {isSuccess && (
        <Card shadow className={`my-4 bg-white p-6 text-center`}>
          <TextHeading2>Success</TextHeading2>
          <TextBody>Thank you for testing</TextBody>

          <div className={`my-4 w-full`}>
            <Button
              variant={`primary`}
              onClick={handleDone}
              className={`w-full text-center`}
            >
              Done
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

DMPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default DMPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
