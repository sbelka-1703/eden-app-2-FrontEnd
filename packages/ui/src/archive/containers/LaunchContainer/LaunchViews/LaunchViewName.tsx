import { TextField } from "@eden/package-ui";
import { useContext } from "react";

import { LaunchContext } from "../context";

export const LaunchViewName = () => {
  const { projectName, setProjectName } = useContext(LaunchContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        NAME YOUR PROJECT
      </div>
      <TextField
        label="Name Your Project"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </div>
  );
};
