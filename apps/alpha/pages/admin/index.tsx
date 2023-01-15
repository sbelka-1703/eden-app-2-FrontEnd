import {
  AppPublicLayout,
  Button,
  GridItemFour,
  GridLayout,
} from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../_app";

const AdminPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <GridLayout>
      <GridItemFour>
        <Button
          variant="primary"
          onClick={() => router.push("./admin/create-party")}
        >
          Create Party
        </Button>
      </GridItemFour>
      <GridItemFour>{}</GridItemFour>
      <GridItemFour>{}</GridItemFour>
    </GridLayout>
  );
};

AdminPage.getLayout = (page) => <AppPublicLayout>{page}</AppPublicLayout>;
export default AdminPage;
