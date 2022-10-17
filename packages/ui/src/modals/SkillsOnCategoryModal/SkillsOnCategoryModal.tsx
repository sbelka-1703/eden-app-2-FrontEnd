/* eslint-disable camelcase */
import {
  Maybe,
  SkillCategory,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Button,
  Modal,
  SearchSkill,
  SkillCategoryList,
} from "@eden/package-ui";

export interface ISkillsOnCategoryModalProps {
  isOpen: boolean;
  skills: Maybe<SkillRoleType>[] | any;
  categories: SkillCategory[];
  // eslint-disable-next-line no-unused-vars
  setSkills: (skills: SkillRoleType[]) => void;
  handelAddSkills: () => void;
}

export const SkillsOnCategoryModal = ({
  isOpen,
  categories,
  skills,
  setSkills,
  handelAddSkills,
}: ISkillsOnCategoryModalProps) => {
  const mappedSkills = skills?.map(
    (skill: SkillRoleType) =>
      ({
        skillInfo: {
          _id: skill?.skillData?._id,
          name: skill?.skillData?.name,
          categorySkills: skill?.skillData?.categorySkills,
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
            categorySkills: skill?.skillInfo?.categorySkills,
          },
          level: skill?.level,
        } as SkillRoleType)
    );

    setSkills(_mappedSkills);
  };
  const handleDeleteSkills = (_skill: Maybe<SkillType_Member> | undefined) => {
    const _mappedSkills = mappedSkills
      ?.filter((skill: any) => {
        return skill.skillInfo?._id !== _skill?.skillInfo?._id;
      })
      .map(
        (skill: SkillType_Member) =>
          ({
            skillData: {
              _id: skill?.skillInfo?._id,
              name: skill?.skillInfo?.name,
            },
            level: skill?.level,
          } as SkillRoleType)
      );

    setSkills(_mappedSkills!);
  };

  return (
    <div>
      <Modal open={isOpen} closeOnEsc={false}>
        {/* this prevents the combobox input autofocus */}
        <button></button>
        {/* ----- */}
        mappedSkills:{JSON.stringify(mappedSkills)}
        categories:{JSON.stringify(categories)}
        <div className={`h-7/10 scrollbar-hide overflow-y-scroll`}>
          <SearchSkill
            key={JSON.stringify(skills)}
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
            <SkillCategoryList
              key={JSON.stringify(skills)}
              colorRGB="214,254,255"
              categories={categories}
              skills={mappedSkills}
              closeButton
              handleDeleteSkill={handleDeleteSkills}
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
