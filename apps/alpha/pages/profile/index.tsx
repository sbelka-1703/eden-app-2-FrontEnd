import { gql } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  FillUserProfileContainer,
  GridItemSix,
  GridLayout,
  MemberInfo,
  SEO,
  ViewUserProfileContainer,
} from "@eden/package-ui";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import { useContext, useEffect, useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

export const ADD_NODES = gql`
  mutation ($fields: addNodesToMemberInput!) {
    addNodesToMember(fields: $fields) {
      _id
    }
  }
`;

import { STEPS } from "@eden/package-ui/utils";

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [view, setView] = useState<"grants" | "profile">("grants");

  const [activeIndex, setActiveIndex] = useState(0);
  const submenu = [
    {
      Icon: <FaUserAlt size={20} />,
      FunctionName: "My Profile",
      onFunctionCallback: () => setActiveIndex(0),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "Edit Profile",
      onFunctionCallback: () => setView("profile"),
    },
  ];

  const [userState, setUserState] = useState<Members>();
  const [step, setStep] = useState(STEPS.ROLE);
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserState(currentUser);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <>
      <SEO />
      {view === "grants" && (
        <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
          <Card
            shadow
            className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}
          >
            <div className={`p-4 md:p-8`}>
              <MemberInfo
                member={currentUser}
                setExperienceOpen={setExperienceOpen!}
                experienceOpen={experienceOpen!}
              />
            </div>
          </Card>
        </AppUserSubmenuLayout>
      )}
      {view === "profile" && (
        <AppUserSubmenuLayout showSubmenu={false}>
          <GridLayout>
            <GridItemSix>
              <Card className={"h-85 bg-white shadow"}>
                <FillUserProfileContainer
                  step={step}
                  state={userState}
                  setState={setUserState}
                  setStep={setStep}
                  setExperienceOpen={setExperienceOpen}
                  setView={setView}
                  percentage={getFillProfilePercentage(currentUser)}
                />
              </Card>
            </GridItemSix>
            <GridItemSix>
              <Card className={"h-85 bg-white shadow"}>
                <ViewUserProfileContainer
                  step={step}
                  user={userState}
                  experienceOpen={experienceOpen}
                  setExperienceOpen={setExperienceOpen}
                />
              </Card>
            </GridItemSix>
          </GridLayout>
        </AppUserSubmenuLayout>
      )}
    </>
  );
};

export default ProfilePage;

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
