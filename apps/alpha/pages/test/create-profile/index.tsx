import { UserContext } from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Card,
  GridItemSix,
  GridLayout,
  ViewUserProfileContainer,
  Wizard,
  WizardStep,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils";
import { useContext, useEffect, useState } from "react";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  // const [view, setView] = useState<"grants" | "profile">("grants");

  const [userState, setUserState] = useState<Members>();
  const [step] = useState(STEPS.ROLE);
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

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
          <Card className={"h-85 bg-white shadow"}>
            {/* <FillUserProfileContainer
              step={step}
              state={userState}
              setState={setUserState}
              setStep={setStep}
              setExperienceOpen={setExperienceOpen}
              setView={setView}
              percentage={getFillProfilePercentage(currentUser)}
            />
          */}
            <Wizard showStepsHeader>
              <WizardStep label="step 0">0</WizardStep>
              <WizardStep label="step 1">1</WizardStep>
              <WizardStep label="step 2">2</WizardStep>
              <WizardStep label="step 3">3</WizardStep>
              <WizardStep label="step 4">4</WizardStep>
              <WizardStep label="step 5">5</WizardStep>
              <WizardStep label="step 6">6</WizardStep>
              <WizardStep label="step 7">7</WizardStep>
            </Wizard>
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
