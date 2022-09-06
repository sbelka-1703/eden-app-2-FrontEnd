import { SignUpProvider } from "@context/eden";
import type { NextPage } from "next";
import Head from "next/head";
import { Card, GridItemSix, GridItemThree, GridLayout, LoginButton } from "ui";

const LoginPage: NextPage = () => {
  return (
    <div className={`bg-background grid h-screen content-center `}>
      <Head>
        <title>Eden protocol - Login</title>
      </Head>

      <SignUpProvider>
        <GridLayout>
          <GridItemThree> </GridItemThree>
          <GridItemSix>
            <Card shadow className={`h-5/10 bg-white p-6`}>
              <div
                className={`text-darkGreen my-12 text-center text-2xl font-semibold uppercase`}
              >
                you must be logged in
              </div>
              <LoginButton />
            </Card>
          </GridItemSix>
          <GridItemThree> </GridItemThree>
        </GridLayout>
      </SignUpProvider>
    </div>
  );
};

export default LoginPage;
