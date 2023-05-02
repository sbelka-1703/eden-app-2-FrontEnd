import { AppUserLayout, Card, SEO, Wizard, WizardStep } from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const HomePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <SEO />
      <Card className="mx-auto mt-3 h-[88vh] w-full max-w-5xl bg-white" shadow>
        <div className="w-full p-8">
          <Wizard>
            <WizardStep label={"welcome"}>
              <h2>Welcome to Eden AI</h2>
              <p>You are selected to do an interview with Tesla</p>
            </WizardStep>
            <WizardStep label={"welcome"}>
              <h3>
                Your first interview with Tesla will be a discussion with EdenAI
              </h3>
              <p>You are selected to do an interview with Tesla</p>
            </WizardStep>
            <WizardStep label={"cv"}>
              <h3>Hey {currentUser?.discordName}!</h3>
              <p>Upload your CV here</p>
              <p>--- ADD UPLOAD CV BUTTON --</p>
            </WizardStep>
            <WizardStep label={"chat"}>
              <h3>Hey {currentUser?.discordName}!</h3>
              <p>Upload your CV here</p>
              <p>--- ADD UPLOAD CV BUTTON --</p>
            </WizardStep>
          </Wizard>
        </div>
      </Card>
    </>
  );
};

HomePage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default HomePage;

import { UserContext } from "@eden/package-context";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";
import { useContext } from "react";

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
