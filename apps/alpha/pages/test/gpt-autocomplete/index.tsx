import { Project } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  CreateProjectViewAddRoleGPT,
  CreateProjectViews2GPT,
  CreateProjectViewStartGPT,
  GridItemSix,
  GridLayout,
  SEO,
} from "@eden/package-ui";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { NextPageWithLayout } from "../../_app";

const TestPage: NextPageWithLayout = () => {
  const [project, setProject] = useState<Project>();

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      example: "",
    },
  });

  // const autocomplete =
  //   'I want you to act as a text extension assistant. Do not edit or change the sentences I give you in any way. I give you sentences and you return those sentences unedited with a continuation to those sentences. \nExample: \nI write: A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage. They are responsible for installing, repairing and maintaining pipes, fixtures and other plumbing equipment.\nYou respond with:  A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage. They are responsible for installing, repairing and maintaining pipes, fixtures and other plumbing equipment.   Plumbers also inspect structures to identify any potential problems, such as clogged drains, leaking pipes and faulty water heaters. In addition, they install appliances such as dishwashers and water heaters, and may be asked to perform basic carpentry work to install kitchen and bathroom cabinets.\nI write: Today was a crazy day in the lab, instruments were not working and our computer system went down. Everyone was scrambling to find a solution, with no luck. \nYou respond with: Today was a crazy day in the lab, instruments were not working and our computer system went down. Everyone was scrambling to find a solution, with no luck. After a few hours of troubleshooting, we realized that we needed to call in a professional. We contacted a local plumber, who arrived quickly and was able to diagnose the problem in no time. He was able to repair the faulty wiring and get our instruments and computer system back up and running. We were extremely thankful for his expertise, and all of the researchers were relieved that our experiments could get back on track.\n\nExample complete.\n\nDo not write "You respond with:" in you response\n\nHere are the sentence/sentences that I give you: \n\n\n';

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemSix className={`h-85 scrollbar-hide overflow-y-scroll `}>
          <CreateProjectViewStartGPT
            project={project}
            setProject={() => setProject}
            onNext={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Controller name={"GPT-Role"} control={control}>
            render=
            {({ field: { onChange } }) => (
              <CreateProjectViews2GPT
                onBack={function (): void {
                  throw new Error("Function not implemented.");
                }}
                battery={2}
                onNext={function (): void {
                  throw new Error("Function not implemented.");
                }}
                setProject={function (data): void {
                  console.info({ data });
                }}
                onReturn={(val) => onChange(val)}
              />
            )}
          </Controller>

          <CreateProjectViewAddRoleGPT
            project={project}
            battery={90}
            onBack={function (): void {
              throw new Error("Function not implemented.");
            }}
            setProject={() => setProject}
            roleIndex={1}
            onNewPosition={function () {
              console.log("");
            }}
            onLaunch={() => console.log("")}
          />
        </GridItemSix>
        <GridItemSix>Test</GridItemSix>
      </GridLayout>
    </>
  );
};

TestPage.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default TestPage;
