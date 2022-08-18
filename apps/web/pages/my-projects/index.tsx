import type { NextPage } from "next";
import { GridItemSix, GridItemThree, GridLayout } from "ui";

const MyProjectsPage: NextPage = () => {
  return (
    <GridLayout>
      <GridItemThree>left side</GridItemThree>
      <GridItemSix>center</GridItemSix>
      <GridItemThree>right side</GridItemThree>
    </GridLayout>
  );
};

export default MyProjectsPage;
