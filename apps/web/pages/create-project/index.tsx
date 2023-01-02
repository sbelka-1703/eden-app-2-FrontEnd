import {
  AppUserLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  SEO,
} from "@eden/package-ui";

import { NextPageWithLayout } from "../_app";

const FillProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <GridLayout>
        {/* <GridItemSix className={`h-85 scrollbar-hide overflow-y-scroll `}>
          {" "}
        </GridItemSix> */}

        <GridItemTwo> </GridItemTwo>
        <GridItemEight>
          <div className={`h-7/10 grid grid-cols-1 content-center`}>
            <Card
              shadow
              className={`font-poppins bg-white p-8 text-center text-3xl font-semibold text-gray-600`}
            >
              Coming Soon
            </Card>
          </div>
        </GridItemEight>
        <GridItemTwo> </GridItemTwo>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default FillProfilePage;
