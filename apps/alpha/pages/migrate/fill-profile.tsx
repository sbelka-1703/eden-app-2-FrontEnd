import { UserContext, UserProvider } from "@eden/package-context";
import {
  AppUserLayout,
  FillUserProfileContainer,
  GridItemSix,
  GridLayout,
  SEO,
  ViewUserProfileContainer,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils";
import { getDynamicURL } from "@eden/package-ui/utils/dynamic-url";
import { useContext, useEffect, useState } from "react";

import { NextPageWithLayout } from "../_app";

const INITIAL_EXP = {
  title: "",
  skills: [],
  startDate: "",
  endDate: "",
  bio: "",
};

const FillProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [step, setStep] = useState(STEPS.ROLE);

  const [state, setState] = useState({
    discordName: currentUser?.discordName,
    discordAvatar: currentUser?.discordAvatar,
    discriminator: currentUser?.discriminator,
    memberRole: currentUser?.memberRole,
    bio: currentUser?.bio as string,
    match: 100,
    hoursPerWeek: currentUser?.hoursPerWeek,
    // expectedSalary: 0,
    links: currentUser?.links,
    background: [{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }] as
      | any[]
      | undefined,
  });
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  useEffect(() => {
    setState({
      ...state,
      discordName: currentUser?.discordName,
      discordAvatar: currentUser?.discordAvatar,
      discriminator: currentUser?.discriminator,
      memberRole: currentUser?.memberRole,
      bio: currentUser?.bio as string,
      match: 100,
      hoursPerWeek: currentUser?.hoursPerWeek,
      //   expectedSalary: 0,
      links: currentUser?.links,
      background:
        currentUser?.previusProjects?.length &&
        currentUser?.previusProjects?.length > 0
          ? currentUser?.previusProjects?.map((proj) => ({
              title: proj?.title,
              bio: proj?.description,
              startDate: proj?.startDate,
              endDate: proj?.endDate,
            }))
          : [{ ...INITIAL_EXP }, { ...INITIAL_EXP }, { ...INITIAL_EXP }],
    });
  }, [currentUser]);

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className="">
          <a
            href={getDynamicURL("https://airtable.com/shrs5Y5wNEISaB7Uc", [
              {
                name: "prefill_Eden+Profile",
                value:
                  "https://eden-alpha-develop.vercel.app/profile/" +
                  currentUser?.discordName,
              },
              { name: "prefill_Microgrant+Name", value: "DD microgrant" },
              {
                name: "prefill_Discord+Handle",
                value:
                  `${currentUser?.discordName}#${currentUser?.discriminator}` ||
                  "",
              },
            ])}
          >
            {getDynamicURL("https://airtable.com/shrs5Y5wNEISaB7Uc", [
              {
                name: "prefill_Eden+Profile",
                value:
                  "https://eden-alpha-develop.vercel.app/profile/" +
                  currentUser?.discordName,
              },
              { name: "prefill_Microgrant+Name", value: "DD microgrant" },
              {
                name: "prefill_Discord+Handle",
                value:
                  `${currentUser?.discordName}#${currentUser?.discriminator}` ||
                  "",
              },
            ])}
          </a>
          <FillUserProfileContainer
            step={step}
            state={state}
            setState={setState}
            setStep={setStep}
            setExperienceOpen={setExperienceOpen}
          />
        </GridItemSix>

        <GridItemSix className="">
          <ViewUserProfileContainer
            step={step}
            user={state}
            experienceOpen={experienceOpen}
            setExperienceOpen={setExperienceOpen}
          />
        </GridItemSix>
      </GridLayout>
    </>
  );
};

FillProfilePage.getLayout = (page) => (
  <AppUserLayout>
    <UserProvider>{page}</UserProvider>
  </AppUserLayout>
);

export default FillProfilePage;
