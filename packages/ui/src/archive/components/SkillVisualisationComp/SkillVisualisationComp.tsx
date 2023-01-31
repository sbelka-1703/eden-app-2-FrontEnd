/* eslint-disable camelcase */
import {
  Maybe,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { CheckBox } from "@eden/package-ui";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useState } from "react";

import { SkillList } from "../../lists/SkillList/SkillList";

export interface SkillVisualisationCompProps {
  skills: SkillRoleType[];
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill?: (skill: any) => void;
}
export const SkillVisualisationComp: React.FC<SkillVisualisationCompProps> = ({
  skills,
  handleDeleteSkill,
}) => {
  const [selectSenior, setSelectSenior] = useState(true);
  const [selectMid, setSelectMid] = useState(true);
  const [selectJunior, setSelectJunior] = useState(true);
  const [selectLearning, setSelectLearning] = useState(true);

  const mappedSkills = skills?.map(
    (skill: SkillRoleType) =>
      ({
        skillInfo: skill?.skillData,
        level: skill?.level,
      } as SkillType_Member)
  );
  const seniorSkills: Maybe<SkillType_Member>[] | undefined =
    mappedSkills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "senior"
    );
  const midSkills: Maybe<SkillType_Member>[] | undefined = mappedSkills?.filter(
    (skill: Maybe<SkillType_Member>) => skill?.level === "mid" || !skill?.level
  );

  const juniorSkills: Maybe<SkillType_Member>[] | undefined =
    mappedSkills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "junior"
    );

  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    mappedSkills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-between">
        <div>
          <CheckBox
            name="senior"
            label="SENIOR"
            radius="default"
            checked={selectSenior}
            onChange={() => setSelectSenior(!selectSenior)}
            bgColorRGB="224, 242, 211"
            brColorRGB="191, 255, 140"
          />
        </div>
        <div>
          <CheckBox
            name="mid level"
            label="MID"
            radius="default"
            checked={selectMid}
            onChange={() => setSelectMid(!selectMid)}
            bgColorRGB="250, 207, 243"
            brColorRGB="255, 169, 241"
          />
        </div>
        <div>
          <CheckBox
            name="junior"
            label="JUNIOR"
            radius="default"
            checked={selectJunior}
            onChange={() => setSelectJunior(!selectJunior)}
            bgColorRGB="210, 237, 252"
            brColorRGB="186, 230, 255"
          />
        </div>
        <div>
          <CheckBox
            name="learning"
            label="LEARNING"
            radius="default"
            checked={selectLearning}
            onChange={() => setSelectLearning(!selectLearning)}
            bgColorRGB="250, 234, 175"
            brColorRGB="255, 208, 43"
          />
        </div>
      </div>
      <div className="mt-3">
        <div>
          {selectSenior && seniorSkills?.length > 0 && (
            <SkillList
              closeButton
              handleDeleteSkill={handleDeleteSkill}
              skills={seniorSkills}
              colorRGB="191, 255, 140"
              overflowNumber={15}
            />
          )}
        </div>
        <div className="mt-1">
          {selectMid && midSkills?.length > 0 && (
            <SkillList
              closeButton
              handleDeleteSkill={handleDeleteSkill}
              skills={midSkills}
              colorRGB="255, 169, 241"
              overflowNumber={15}
            />
          )}
        </div>
        <div className="mt-1">
          {selectJunior && juniorSkills?.length > 0 && (
            <SkillList
              closeButton
              handleDeleteSkill={handleDeleteSkill}
              skills={juniorSkills}
              colorRGB="186, 230, 255"
              overflowNumber={15}
            />
          )}
        </div>
        <div className="mt-1">
          {selectLearning && learningSkills?.length > 0 && (
            <SkillList
              closeButton
              handleDeleteSkill={handleDeleteSkill}
              skills={learningSkills}
              colorRGB="255, 208, 43"
              overflowNumber={15}
            />
          )}
        </div>
      </div>
    </div>
  );
};
