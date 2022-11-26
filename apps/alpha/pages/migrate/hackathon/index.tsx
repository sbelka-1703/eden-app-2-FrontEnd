import {
  AppUserLayout,
  Card,
  FiltersCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  HackathonModalContainer,
  SEO,
  StaticCard,
  UserProfileCard,
} from "@eden/package-ui";

import HACK2_MOCK from "../../../utils/mock/skillTreeWorks_Hackathon_Project2";
import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const [roleFilter, setRoleFilter] = useState<any>(null);

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

  const { setOpenModal } = useContext(HackathonContext);

  useEffect(() => {
    setOpenModal(HackathonProjectModal.START_INFO);
    // console.log("openModal");
  }, []);

  // console.log("dataNodes", dataNodes);

  const res =
    roleFilter?.main && roleFilter?.main.length > 0
      ? HACK2_MOCK.resultsOnChoice[roleFilter.main[0].name as keyof Object]
      : [];

  const matchedUsers = (res as any[]).map(
    (item: {
      result: string;
      percentage: string;
      rolesPercentages: string[];
    }) => {
      const user: any = HACK2_MOCK.Result[item?.result as keyof Object];

      user.percentage = item.percentage;
      user.rolesPercentages = item.rolesPercentages;

      return user;
    }
  );

  // console.log("HACK2_MOCK", HACK2_MOCK);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree className="h-85 scrollbar-hide overflow-scroll">
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
          <Card
            shadow
            className="scrollbar-hide h-85 overflow-scroll bg-white p-4"
          >
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matchedUsers.map((item, index) => (
                <StaticCard
                  key={index}
                  item={item}
                  resultCardFlag={HACK2_MOCK?.ResultCardShowFlag}
                  resultPopUpFlag={HACK2_MOCK?.ResultPopUpShowFlag}
                />
              ))}
            </div>
          </Card>
        </GridItemNine>
      </GridLayout>
      <HackathonModalContainer
        setSubmittingTalentAttributes={(val: any) => {
          setRoleFilter(val);
        }}
        mockData={HACK2_MOCK}
      />
    </>
  );
};

LaunchPage.getLayout = (page) => (
  <HackathonProvider>
    <AppUserLayout>{page}</AppUserLayout>
  </HackathonProvider>
);

export default LaunchPage;

import {
  HackathonContext,
  HackathonProjectModal,
  HackathonProvider,
} from "@eden/package-context";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

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
