import {
  LaunchProjectContext,
  LaunchProjectModal,
  LaunchProjectProvider,
} from "@eden/package-context";
import {
  AppUserLayout,
  Card,
  FiltersCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  ShortlistModalContainerStoryFilter,
  StaticCard,
  UserProfileCard,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import PROJECT_MOCK from "../../../utils/mock/projectMock";
import type { NextPageWithLayout } from "../../_app";

const LaunchPage: NextPageWithLayout = () => {
  const [roleFilter, setRoleFilter] = useState<any>(null);

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

  const { setOpenModal } = useContext(LaunchProjectContext);

  useEffect(() => {
    setOpenModal(LaunchProjectModal.SKILLS_CATEGORY);
  }, []);

  const res =
    roleFilter?.main && roleFilter?.main.length > 0
      ? PROJECT_MOCK.resultsOnChoice[roleFilter.main[0].name as keyof Object]
      : [];

  const matchedUsers = (res as any[]).map(
    (item: {
      result: string;
      percentage: string;
      rolesPercentages: string[];
    }) => {
      const user: any = PROJECT_MOCK.Result[item?.result as keyof Object];

      user.percentage = item.percentage;
      user.rolesPercentages = item.rolesPercentages;

      return user;
    }
  );

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
              {matchedUsers.map((item, index) => (
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
      <ShortlistModalContainerStoryFilter
        setSubmittingTalentAttributes={(val) => {
          setRoleFilter(val);
        }}
        mockData={PROJECT_MOCK}
      />
    </>
  );
};

LaunchPage.getLayout = (page) => (
  <LaunchProjectProvider>
    <AppUserLayout>{page}</AppUserLayout>
  </LaunchProjectProvider>
);

export default LaunchPage;
