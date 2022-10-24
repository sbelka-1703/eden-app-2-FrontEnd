import {
  AppUserLayout,
  FiltersCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  UserProfileCard,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  // const { project, dispatchProject, selectedRole, matchMembersPage } =
  //   useContext(LaunchProjectContext);

  const handleSetSkills = (val: any) => {
    console.log(val);
  };
  const handleSetHoursPerWeek = (val: any) => {
    console.log(val);
  };
  const handleSetBudget = (val: any) => {
    console.log(val);
  };
  const handleDeleteSkill = (val: any) => {
    console.log(val);
  };

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree className="h-8/10 scrollbar-hide overflow-scroll">
          <UserProfileCard />
          <FiltersCard
            defaultValue={{}}
            skills={[]}
            handleSetSkills={handleSetSkills}
            handleDeleteSkill={handleDeleteSkill}
            handleSetHoursPerWeek={handleSetHoursPerWeek}
            handleSetBudget={handleSetBudget}
          />
        </GridItemThree>

        <GridItemNine className="scrollbar-hide h-8/10 overflow-scroll">
          {/* <ShortlistContainer
            matchingMembers={filteredMembers}
            overflow={matchingMembers?.matchSkillsToMembers!.length < 9}
          /> */}
        </GridItemNine>
      </GridLayout>
    </>
  );
};

LaunchPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default LaunchPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

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
