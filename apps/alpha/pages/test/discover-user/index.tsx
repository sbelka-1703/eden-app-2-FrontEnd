import {
  LaunchProjectContext,
  LaunchProjectModal,
  LaunchProjectProvider,
} from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  Card,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  MemberProfileCard,
  SEO,
  ShortlistModalContainerStoryFilter,
  StaticCard,
  WarningCard,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import welcome from "../../../public/welcome.png";
import USER_MOCK from "../../../utils/mock/userMock";
import type { NextPageWithLayout } from "../../_app";

const UserPage: NextPageWithLayout = () => {
  const [roleFilter, setRoleFilter] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<Members | null>(null);
  const router = useRouter();

  //@TODO - using this context is extremely overkill.
  // I'm using it for speed but it should be replaced with a more accurate one

  const { setOpenModal } = useContext(LaunchProjectContext);

  useEffect(() => {
    setOpenModal(LaunchProjectModal.START_INFO);
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
          <WarningCard
            // profilePercentage={getFillProfilePercentage({
            //   ...state,
            //   nodes:
            //     currentUser &&
            //     currentUser.nodes &&
            //     currentUser.nodes?.length > (nodesID || []).length
            //       ? currentUser.nodes
            //       : nodesID,
            // })}
            onClickCompleteProfile={() => router.push("/test/create-project")}
            text1="You can see users"
            text2="Users can't find your project"
          />
        </GridItemThree>

        {!selectedMember ? (
          <GridItemNine className="">
            <Card className="scrollbar-hide h-85 overflow-scroll bg-white p-4">
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {matchedUsers.map((item, index) => (
                  <StaticCard
                    key={index}
                    item={item}
                    resultCardFlag={USER_MOCK?.ResultCardShowFlag}
                    resultPopUpFlag={USER_MOCK?.ResultPopUpShowFlag}
                    onOpen={() => {
                      // item to type Members

                      const mappedMember: Members = {
                        discordName: item.name,
                        discordAvatar: item.picture,
                        discriminator: item.Descrimator,
                        bio: item.description,
                      };

                      setSelectedMember(mappedMember);
                    }}
                  />
                ))}
              </div>
            </Card>
          </GridItemNine>
        ) : (
          <GridItemSix className="">
            <MemberProfileCard
              percentage={70}
              // key={selectedMember?._id}
              member={selectedMember}
              // onClickNotNow={() => {
              //   setSelectedMemberId(null);
              //   setSelectedMemberPercentage(null);
              // }}
              // onClickAddToList={() => {
              //   handleShortlistMember();
              // }}
              onClickBack={() => {
                setSelectedMember(null);
              }}
            />
          </GridItemSix>
        )}
      </GridLayout>
      <ShortlistModalContainerStoryFilter
        image={welcome.src}
        matchType="People"
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
