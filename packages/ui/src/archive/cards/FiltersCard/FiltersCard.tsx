/* eslint-disable camelcase */
import {
  Maybe,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Card,
  CategorySearchSkill,
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

export interface FiltersCardProps {
  defaultValue: any;
  skills: any[];
  handleSetSkills?: any;
  // eslint-disable-next-line no-unused-vars
  handleSetHoursPerWeek?: (val: any) => void;
  handleSetBudget?: any;
  handleDeleteSkill?: any;
  cardTypeProject?: boolean;
}
export const FiltersCard: React.FC<FiltersCardProps> = ({
  defaultValue,
  skills,
  handleSetSkills,
  handleSetHoursPerWeek,
  handleSetBudget,
  handleDeleteSkill,
  cardTypeProject = true,
}) => {
  const [unpaid, setUnpaid] = useState(false);

  const mappedSkills = skills.map(
    (skill: Maybe<SkillRoleType>) =>
      ({
        skillInfo: {
          _id: skill?.skillData?._id,
          name: skill?.skillData?.name,
        },
        level: skill?.level,
      } as SkillType_Member)
  );

  const handleUnpaid = (e: any) => {
    setUnpaid(e.target.checked);
    if (e.target.checked) handleSetBudget!({ perHour: "0", token: "" });
    if (!e.target.checked) handleSetBudget!({ perHour: "0", token: "" });
  };

  const _handleSetSkills = (_skills: SkillType_Member[]) => {
    const _mappedSkills = _skills.map(
      (skill: SkillType_Member) =>
        ({
          skillData: {
            _id: skill?.skillInfo?._id,
            name: skill?.skillInfo?.name,
          },
          level: skill?.level,
        } as SkillRoleType)
    );

    handleSetSkills(_mappedSkills);
  };

  return (
    <Card className="z-0 w-full bg-white p-4">
      <div>
        <div>
          <span className="text-base font-bold capitalize tracking-wide text-slate-300">
            🛠 Add your skills
          </span>
        </div>
        <div className="mt-2">
          <CategorySearchSkill
            levels={levels}
            skills={mappedSkills as Maybe<Maybe<SkillType_Member>[]>}
            setSkills={_handleSetSkills}
          />
        </div>
        <div>
          <SkillVisualisationComp
            skills={skills!}
            handleDeleteSkill={handleDeleteSkill}
          />
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
                    name="hoursPerWeek"
                    placeholder="0"
                    radius="rounded"
                    type="number"
                    defaultValue={defaultValue?.hoursPerWeek}
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
              {cardTypeProject ? (
                <span className="text-md tracking-wide">
                  Set the rewards for the contributor:
                </span>
              ) : (
                <>
                  {/* <div className="text-lg	font-normal	tracking-wide">
                    Do you expect to be rewarded?
                  </div>
                  <div className="text-sm	font-light tracking-wide text-slate-500">
                    You can always edit this information in the settings
                  </div> */}
                </>
              )}
              {cardTypeProject && (
                <div className="flex w-full flex-row content-center items-center">
                  <div className="mr-2 w-2/3">
                    <TextField
                      key={"" + unpaid}
                      name="budget"
                      placeholder="0"
                      radius="rounded"
                      type="number"
                      defaultValue={unpaid ? "" : defaultValue?.budget?.perHour}
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
                      defaultValue={unpaid ? "" : defaultValue?.budget?.token}
                      onChange={(e) =>
                        handleSetBudget({ token: e.target.value })
                      }
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
              )}
              <div className="flex flex-col">
                {/* <div className="mt-3">
                  <SwitchButton
                    name="alternate_token"
                    label="Accept equivalent in alternative tokens"
                    onChange={() => console.log("ass")}
                  />
                </div> */}
                {cardTypeProject && (
                  <div className="mt-3">
                    <SwitchButton
                      name="unpaid"
                      label="Unpaid"
                      onChange={handleUnpaid}
                    />
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Card>
  );
};
