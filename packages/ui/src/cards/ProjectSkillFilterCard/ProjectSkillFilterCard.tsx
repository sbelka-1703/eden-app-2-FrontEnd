/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@eden/package-graphql/generated";
import {
  Card,
  SearchSkill,
  SkillVisualisationComp,
  SwitchButton,
  TextField,
} from "@eden/package-ui";
import { useState } from "react";

const levels = [
  {
    title: "learning",
    level: "learning",
  },
  {
    title: "mid",
    level: "mid",
  },
  {
    title: "junior",
    level: "junior",
  },
  {
    title: "senior",
    level: "senior",
  },
];

export interface ProjectSkillFilterCardProps {
  skills: any[];
  handleSetSkills?: any;
  // eslint-disable-next-line no-unused-vars
  handleSetHoursPerWeek?: (val: any) => void;
  handleSetBudget?: any;
}
export const ProjectSkillFilterCard: React.FC<ProjectSkillFilterCardProps> = ({
  skills,
  handleSetSkills,
  handleSetHoursPerWeek,
  handleSetBudget,
}) => {
  const [unpaid, setUnpaid] = useState(false);

  const handleUnpaid = (e: any) => {
    setUnpaid(e.target.checked);
    if (e.target.checked) handleSetBudget!({ perHour: "0", token: "" });
    if (!e.target.checked) handleSetBudget!({ perHour: "0", token: "" });
  };

  return (
    <Card className="z-0 bg-white p-4">
      <div>
        <div>
          <span className="text-base font-bold capitalize tracking-wide text-slate-300">
            🛠 Add your skills
          </span>
        </div>
        <div className="mt-2">
          <SearchSkill
            levels={levels}
            skills={skills as Maybe<Maybe<SkillType_Member>[]>}
            setSkills={handleSetSkills}
          />
        </div>
        <div>
          <SkillVisualisationComp skills={skills!} />
        </div>
        <div>
          <div>
            <div className="mt-3">
              <span className="text-md tracking-wide">
                Desired availability of the contributor:
              </span>
              {/* <div className="text-lg	font-normal	tracking-wide">
                How much time can you devote?
              </div>
              <div className="text-sm	font-light tracking-wide text-slate-500">
                You can always edit this information in the settings
              </div> */}
              <div className="flex flex-row content-center items-center">
                <div className="w-24">
                  <TextField
                    name="hoursPerWeek"
                    placeholder="0"
                    radius="rounded"
                    type="number"
                    onChange={handleSetHoursPerWeek!}
                  />
                </div>
                <span className="font-sm ml-2">hours/week</span>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div className="mt-3">
              <span className="text-md tracking-wide">
                Set the rewards for the contributor:
              </span>
              {/* <div className="text-lg	font-normal	tracking-wide">
                Do you expect to be rewarded?
              </div>
              <div className="text-sm	font-light tracking-wide text-slate-500">
                You can always edit this information in the settings
              </div> */}
              <div className="flex w-full flex-row content-center items-center">
                <div className="mr-2 w-2/3">
                  <TextField
                    key={"" + unpaid}
                    name="budget"
                    placeholder="0"
                    radius="rounded"
                    type="number"
                    defaultValue={unpaid ? "0" : ""}
                    onChange={(e) =>
                      handleSetBudget({ perHour: e.target.value })
                    }
                    disabled={unpaid}
                  />
                </div>
                <div className="w-1/3">
                  <TextField
                    key={"" + unpaid}
                    name="token"
                    placeholder="token"
                    radius="rounded"
                    type="text"
                    defaultValue={""}
                    onChange={(e) => handleSetBudget({ token: e.target.value })}
                    disabled={unpaid}
                  />
                </div>
                {/* <div className="ml-3 w-24">
                  <TextField
                    name="timeDevoted"
                    placeholder="0"
                    radius="rounded"
                    type="number"
                    onChange={() => console.log("sass")}
                  />
                </div> */}
              </div>
              <div className="flex flex-col">
                {/* <div className="mt-3">
                  <SwitchButton
                    name="alternate_token"
                    label="Accept equivalent in alternative tokens"
                    onChange={() => console.log("ass")}
                  />
                </div> */}
                <div className="mt-3">
                  <SwitchButton
                    name="unpaid"
                    label="Unpaid"
                    onChange={handleUnpaid}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Card>
  );
};
