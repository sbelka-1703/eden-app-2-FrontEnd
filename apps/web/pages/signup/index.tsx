import { SignUpProvider } from "@context/eden";
import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, SignUpContainer } from "ui";

const SignUpPage: NextPage = () => {
  return (
    <SignUpProvider>
      <GridLayout>
        <GridItemThree> </GridItemThree>
        <GridItemSix>
          <SignUpContainer />
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </SignUpProvider>
  );
};

export default SignUpPage;
