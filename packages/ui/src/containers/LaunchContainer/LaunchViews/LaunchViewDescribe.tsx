import { LaunchContext } from "@context/eden";
import { useContext } from "react";
import { TextField } from "ui";

export const LaunchViewDescribe = () => {
  const { projectDescription, setProjectDescription } =
    useContext(LaunchContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        DESCRIBE YOUR PROJECT
      </div>
      <TextField
        label="Describe Your Project"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
    </div>
  );
};
