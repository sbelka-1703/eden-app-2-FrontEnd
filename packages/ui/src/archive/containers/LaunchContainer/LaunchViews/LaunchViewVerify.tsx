import { SocialMediaComp } from "@eden/package-ui";
import { useContext } from "react";

import { BioComponent } from "../../../components/BioComponent/BioComponent";
import { LaunchContext } from "../context";

export const LaunchViewVerify = () => {
  const { projectName, projectDescription } = useContext(LaunchContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        {projectName}
      </div>
      <div className={`grid grid-cols-12 space-x-4 pt-4`}>
        <div className={`col-span-8`}>
          <BioComponent
            title={`Project Description`}
            description={projectDescription}
          />
        </div>
        <div className={`col-span-4`}>
          <SocialMediaComp />
        </div>
      </div>
      <h1>LaunchViewVerify</h1>
    </div>
  );
};
