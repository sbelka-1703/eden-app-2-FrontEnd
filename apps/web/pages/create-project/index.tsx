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
              className={`bg-white p-8 text-center font-poppins text-3xl text-gray-600 font-semibold`}
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
