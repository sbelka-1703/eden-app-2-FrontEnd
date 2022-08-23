import type { NextPage } from "next";
import { Card, GridItemSix, GridItemThree, GridLayout } from "ui";

const LaunchPage: NextPage = () => {
  return (
    <GridLayout>
      <GridItemThree> </GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white">
          launch
        </Card>
      </GridItemSix>
      <GridItemThree> </GridItemThree>
    </GridLayout>
  );
};

export default LaunchPage;
