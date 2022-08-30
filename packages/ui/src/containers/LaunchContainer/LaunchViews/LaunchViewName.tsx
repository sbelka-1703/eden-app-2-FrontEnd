import { LaunchContext } from "@context/eden";
import { useContext } from "react";
import { TextField } from "ui";

export const LaunchViewName = () => {
  const { projectName, setProjectName } = useContext(LaunchContext);

  return (
    <div>
      <h1>LaunchViewName</h1>
      <TextField
        label="Name Your Project"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </div>
  );
};
