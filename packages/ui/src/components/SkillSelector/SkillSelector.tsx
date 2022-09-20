/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
import { Button, Modal, SearchSkill, SkillList } from "ui";

export interface ISkillSelectorProps {
  isOpen: boolean;
  skills: Maybe<SkillType_Member>[];
  // add skills as argument in setSkills and handelAddSkills
  setSkills: () => void;
  handelAddSkills: () => void;
}

export const SkillSelector = ({
  isOpen,
  skills,
  setSkills,
  handelAddSkills,
}: ISkillSelectorProps) => {
  return (
    <div>
      <Modal open={isOpen}>
        <div className={`h-5/10 mt-8`}>
          <SearchSkill skills={[]} setSkills={setSkills} levels={[]} />
          <div className={`mt-4 grid grid-flow-col grid-rows-2 gap-4`}>
            <SkillList
              colorRGB="214,254,255"
              // add Skills
              skills={skills}
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
