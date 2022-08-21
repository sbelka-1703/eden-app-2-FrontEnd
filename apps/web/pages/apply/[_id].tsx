import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GridItemSix, GridItemThree, GridLayout } from "ui";

const ApplyPage: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;

  console.log("_id", _id);
  return (
    <GridLayout>
      <GridItemThree>left side</GridItemThree>
      <GridItemSix>center</GridItemSix>
      <GridItemThree>right side</GridItemThree>
    </GridLayout>
  );
};

export default ApplyPage;
