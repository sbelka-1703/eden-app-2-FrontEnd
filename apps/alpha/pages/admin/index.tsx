/* eslint-disable camelcase */
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  ENTER_ROOM,
  FIND_ROOM,
  MEMBER_UPDATED,
  ROOM_UPDATED,
  UPDATE_MEMBER,
} from "@eden/package-graphql";
import {
  Maybe,
  Members,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  AppPublicLayout,
  Button,
  EditProfileOnboardPartyCard,
  GridItemFour,
  GridItemNine,
  GridItemThree,
  GridLayout,
  OnboardPartyContainer,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

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
