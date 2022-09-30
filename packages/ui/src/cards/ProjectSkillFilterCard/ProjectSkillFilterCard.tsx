import React, { useEffect, useState } from "react";
import {
  TextField,
  SwitchButton,
  Card,
  SearchSkill,
  SkillVisualisationComp,
} from "ui";
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
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
}
export const ProjectSkillFilterCard: React.FC<ProjectSkillFilterCardProps> = ({
  skills,
}) => {
  const handleSetSkills = (addSkill: SkillType_Member[]) => {};

  return (
    <Card shadow>
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
              <div className="text-lg	font-normal	tracking-wide">
                How much time can you devote?
              </div>
              <div className="text-sm	font-light tracking-wide text-slate-500">
                You can always edit this information in the settings
              </div>
              <div className="flex flex-row content-center items-center">
                <div className="w-24">
                  <TextField
                    name="timeDevoted"
                    placeholder="00,01.."
                    radius="rounded"
                    type="number"
                    onChange={() => console.log("sass")}
                  />
                </div>
                <div className="ml-2 font-medium tracking-wide">/ WEEK</div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div className="mt-3">
              <div className="text-lg	font-normal	tracking-wide">
                Do you expect to be rewarded?
              </div>
              <div className="text-sm	font-light tracking-wide text-slate-500">
                You can always edit this information in the settings
              </div>
              <div className="flex flex-row content-center items-center">
                <div className="w-24">
                  <TextField
                    name="timeDevoted"
                    placeholder="00,01.."
                    radius="rounded"
                    type="number"
                    onChange={() => console.log("sass")}
                  />
                </div>
                <div className="ml-3 w-24">
                  <TextField
                    name="timeDevoted"
                    placeholder="00,01.."
                    radius="rounded"
                    type="number"
                    onChange={() => console.log("sass")}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-3">
                  <SwitchButton
                    name="alternate_token"
                    label="Accept equivalent in alternative tokens"
                    onChange={() => console.log("ass")}
                  />
                </div>
                <div className="mt-3">
                  <SwitchButton
                    name="unpaid_contribution"
                    label="Unpaid contributions"
                    onChange={() => console.log("ass")}
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
