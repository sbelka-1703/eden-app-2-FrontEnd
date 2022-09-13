import { LaunchContext } from "@context/eden";
import { useContext } from "react";
import { TextArea, TextField, Calendar } from "ui";

export const LaunchViewBudget = () => {
  const { projectDescription, setProjectDescription } =
    useContext(LaunchContext);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        BUDGET APPLICATION
      </div>
      <div
        className={`font-poppins text-darkGreen mt-3 text-center text-base font-light`}
      >
        Few key sentences on what is the goal, mission, vision of this project
      </div>
      <div className="mt-5 flex flex-row content-center justify-around p-5">
        <div className="">
          <div>
            <TextField
              radius="pill-shadow"
              placeholder="BUDGET"
              onChange={() => console.log()}
            />
          </div>
          <div className="mt-3">
            <TextField
              radius="pill-shadow"
              placeholder="TOKEN"
              onChange={() => console.log()}
            />
          </div>
        </div>
        <div>
          <div>
            <Calendar
              label="KICK OFF DATE"
              minDate={new Date()}
              timePicker={true}
              onChange={() => console.log()}
            />
          </div>
          <div className="mt-3">
            <Calendar
              label="WRAP UP DATE"
              minDate={new Date()}
              timePicker={true}
              onChange={() => console.log()}
            />
          </div>
        </div>
      </div>
      <div>
        <TextArea
          placeholder={`Start typing here`}
          rows={6}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
    </div>
  );
};
