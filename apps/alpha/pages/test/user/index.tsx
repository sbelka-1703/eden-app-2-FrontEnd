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

import USER_MOCK from "../../../utils/mock/userMock";
import type { NextPageWithLayout } from "../../_app";

const UserPage: NextPageWithLayout = () => {
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

  //@TODO - using this context is extremely overkill.
  // I'm using it for speed but it should be replaced with a more accurate one

  const { setOpenModal } = useContext(LaunchProjectContext);

  useEffect(() => {
    setOpenModal(LaunchProjectModal.SKILLS_CATEGORY);
  }, []);

  const res =
    roleFilter?.main && roleFilter?.main.length > 0
      ? USER_MOCK.resultsOnChoice[roleFilter.main[0].name as keyof Object]
      : [];

  const matchedUsers = (res as any[]).map(
    (item: { result: string; percentage: string }) => {
      const user: any = USER_MOCK.Result[item?.result as keyof Object];

      user.percentage = item.percentage;

      return user;
    }
  );

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
          <Card className="scrollbar-hide h-85 overflow-scroll bg-white p-4">
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matchedUsers.map((item, index) => (
                <StaticCard
                  key={index}
                  item={item}
                  resultCardFlag={USER_MOCK?.ResultCardShowFlag}
                  resultPopUpFlag={USER_MOCK?.ResultPopUpShowFlag}
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
        mockData={USER_MOCK}
      />
    </>
  );
};

UserPage.getLayout = (page) => (
  <LaunchProjectProvider>
    <AppUserLayout>{page}</AppUserLayout>
  </LaunchProjectProvider>
);

export default UserPage;
