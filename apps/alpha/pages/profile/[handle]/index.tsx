import { useQuery } from "@apollo/client";
import { FIND_MEMBER_FULL } from "@eden/package-graphql";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemEight,
  GridItemTwo,
  GridLayout,
  Loading,
  NewProfileContainer,
  SEO,
} from "@eden/package-ui";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../../_app";

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { data: dataMember } = useQuery(FIND_MEMBER_FULL, {
    variables: {
      fields: {
        discordName: handle,
      },
    },
    skip: !handle,
    context: { serviceName: "soilservice" },
  });

  //   if (dataMember?.findMember)
  //     console.log(dataMember?.findMember);

  const profile = dataMember?.findMember;

  if (!profile)
    return (
      <div className={`h-screen`}>
        <Loading />
      </div>
    );

  // console.log(profile);

  return (
    <>
      <SEO
        title={`@${profile?.discordName} | on `}
        image={profile?.discordAvatar || ""}
      />
      <AppUserSubmenuLayout showSubmenu={false}>
        <GridLayout>
          <GridItemTwo> </GridItemTwo>
          <GridItemEight>
            <Card className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}>
              {dataMember?.findMember ? (
                <NewProfileContainer user={dataMember?.findMember as Members} />
              ) : (
                <Loading title={`Searching...`} />
              )}
            </Card>
          </GridItemEight>
          <GridItemTwo> </GridItemTwo>
        </GridLayout>
      </AppUserSubmenuLayout>
    </>
  );
};

export default ProfilePage;
