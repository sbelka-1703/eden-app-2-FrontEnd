import {
  AppUserLayout,
  DescriptionGPT,
  GridItemSix,
  GridLayout,
  SEO,
} from "@eden/package-ui";

import { NextPageWithLayout } from "../../_app";

const TestPage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className={`h-85 scrollbar-hide overflow-y-scroll `}>
          <DescriptionGPT />
        </GridItemSix>
        <GridItemSix>Test</GridItemSix>
      </GridLayout>
    </>
  );
};

TestPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default TestPage;
