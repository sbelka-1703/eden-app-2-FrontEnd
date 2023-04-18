import { UserContext } from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  CreateProfileFlow,
  GridItemSix,
  GridLayout,
  MemberInfoWithDynamicGraph2,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  // const [view, setView] = useState<"grants" | "profile">("grants");

  const [userState, setUserState] = useState<Members>();
  // const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserState(currentUser);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <AppUserSubmenuLayout showSubmenu={false}>
      <GridLayout>
        <GridItemSix>
          <Card className={"h-[88vh] bg-white shadow"}>
            <CreateProfileFlow
              setUserState={setUserState}
              userState={userState}
            />
          </Card>
        </GridItemSix>
        <GridItemSix>
          <Card
            className={
              "scrollbar-hide h-[88vh] overflow-scroll bg-white p-4 shadow"
            }
          >
            <MemberInfoWithDynamicGraph2
              // step={step}
              member={userState}
              nodesID={userState?.nodes?.map((node) => node?.nodeData?._id)}
            />
          </Card>
        </GridItemSix>
      </GridLayout>
    </AppUserSubmenuLayout>
  );
};

export default ProfilePage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

import { NextPageWithLayout } from "../../_app";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
