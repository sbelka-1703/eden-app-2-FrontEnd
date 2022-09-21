/* eslint-disable camelcase */
import {
  Maybe,
  SkillRoleType,
  SkillType_Member,
} from "@graphql/eden/generated";
import { Button, Modal, SearchSkill, SkillList } from "ui";

export interface ISkillsModalProps {
  isOpen: boolean;
  skills: Maybe<SkillRoleType>[];
  // eslint-disable-next-line no-unused-vars
  setSkills: (skills: SkillRoleType[]) => void;
  handelAddSkills: () => void;
}

export const SkillsModal = ({
  isOpen,
  skills,
  setSkills,
  handelAddSkills,
}: ISkillsModalProps) => {
  const mappedSkills = skills.map(
    (skill) =>
      ({
        skillInfo: {
          _id: skill?.skillData?._id,
          name: skill?.skillData?.name,
        },
        level: skill?.level,
      } as SkillType_Member)
  );
  const handleSetSkills = (_skills: SkillType_Member[]) => {
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

    setSkills(_mappedSkills);
  };

  return (
    <div>
      <Modal open={isOpen} closeOnEsc={false}>
        {/* this prevents the combobox input autofocus */}
        <button></button>
        {/* ----- */}
        <div className={`h-5/10`}>
          <SearchSkill
            skills={mappedSkills}
            setSkills={handleSetSkills}
            levels={[
              { title: "learning", level: "learning" },
              { title: "junior", level: "junior" },
              { title: "mid", level: "mid" },
              { title: "senior", level: "senior" },
            ]}
          />
          <div className={`mt-4 grid grid-flow-col grid-rows-2 gap-4`}>
            <SkillList
              colorRGB="214,254,255"
              // add Skills
              skills={mappedSkills}
            />
          </div>
        </div>
        <div className={"flex justify-center"}>
          <Button
            className="items-start justify-center"
            variant={`primary`}
            onClick={handelAddSkills}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};
