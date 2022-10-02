/* eslint-disable camelcase */
import { GridItemFour, GridLayout } from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../_app";

const AdminPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <GridLayout>
      <GridItemFour>
        <Button
          variant="primary"
          onClick={() => router.push("./admin/new-role-template")}
        >
          Update Roles
        </Button>
      </GridItemFour>
      <GridItemFour>
        <Button
          variant="primary"
          onClick={() => router.push("./admin/new-skill")}
        >
          Update Skills
        </Button>
      </GridItemFour>
      <GridItemFour>
        <Button
          variant="primary"
          onClick={() => router.push("./admin/new-category")}
        >
          Update Categories
        </Button>
      </GridItemFour>
    </GridLayout>
  );
};

AdminPage.getLayout = (page) => <AppPublicLayout>{page}</AppPublicLayout>;
export default AdminPage;
