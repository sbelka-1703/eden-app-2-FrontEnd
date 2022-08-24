import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout, LaunchContainer } from "ui";

const LaunchPage: NextPage = () => {
  return (
    <GridLayout>
      <GridItemThree> </GridItemThree>
      <GridItemSix>
        <LaunchContainer />
      </GridItemSix>
      <GridItemThree> </GridItemThree>
    </GridLayout>
  );
};

export default LaunchPage;
