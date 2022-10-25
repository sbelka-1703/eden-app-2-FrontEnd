import {
  AppUserLayout,
  Card,
  FiltersCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  StaticCard,
  UserProfileCard,
} from "@eden/package-ui";

import PROJECT_MOCK from "../../../utils/mock/projectMock";
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

  console.log(PROJECT_MOCK);

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

        <GridItemNine className="">
          <Card className="scrollbar-hide h-85 overflow-scroll bg-white p-4">
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {PROJECT_MOCK?.Result.map((item: any, index: number) => (
                <StaticCard
                  key={index}
                  item={item}
                  resultCardFlag={PROJECT_MOCK?.ResultCardShowFlag}
                  resultPopUpFlag={PROJECT_MOCK?.ResultPopUpShowFlag}
                />
              ))}
            </div>
          </Card>
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
