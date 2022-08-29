// import { LaunchContext } from "@context/eden";
// import { useContext } from "react";
import { SkillSelector } from "ui";

export const LaunchViewRoles = () => {
  // const { projectRoles, setProjectRoles } = useContext(LaunchContext);

  return (
    <div>
      <h1>LaunchViewRoles</h1>
      <SkillSelector showSelected />
    </div>
  );
};
