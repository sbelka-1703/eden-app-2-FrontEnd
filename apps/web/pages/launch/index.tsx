import { LaunchProvider } from "@context/eden";
import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, LaunchContainer } from "ui";

const LaunchPage: NextPage = () => {
  return (
    <LaunchProvider>
      <GridLayout>
        <GridItemThree> </GridItemThree>
        <GridItemSix>
          <LaunchContainer />
        </GridItemSix>
        <GridItemThree> </GridItemThree>
      </GridLayout>
    </LaunchProvider>
  );
};

export default LaunchPage;
