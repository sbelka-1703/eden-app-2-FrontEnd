import {
  HackathonContext,
  HackathonProjectModal,
  HackathonProvider,
} from "@eden/package-context";
import {
  AppUserLayout,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  HackathonModalContainer,
  SEO,
  StaticCard,
  UserProfileCard,
  WarningCard,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import HACK2_MOCK from "../../../utils/mock/skillTreeWorks_Hackathon_Project2";
import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [roleFilter, setRoleFilter] = useState<any>(null);

  const { setOpenModal } = useContext(HackathonContext);

  useEffect(() => {
    setOpenModal(HackathonProjectModal.START_INFO);
    // console.log("openModal");
  }, []);

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

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree className="h-85 scrollbar-hide overflow-scroll">
          <UserProfileCard />
          <WarningCard
            profilePercentage={20}
            onClickCompleteProfile={() => router.push("/migrate/fill-profile")}
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
