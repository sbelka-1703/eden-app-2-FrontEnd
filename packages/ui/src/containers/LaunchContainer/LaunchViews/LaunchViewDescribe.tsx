import { LaunchContext } from "@context/eden";
import { useContext } from "react";
import { TextField } from "ui";

export const LaunchViewDescribe = () => {
  const { projectDescription, setProjectDescription } =
    useContext(LaunchContext);

  return (
    <div>
      <h1>LaunchViewDescribe</h1>
      <TextField
        label="Describe Your Project"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
    </div>
  );
};
