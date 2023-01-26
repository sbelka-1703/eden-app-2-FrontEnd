/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@eden/package-graphql/generated";
import { Badge, TextHeading3 } from "@eden/package-ui";

// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
// import { useState } from "react";
import { trimParentheses } from "../../../../utils/trim-parentheses";

const colors = [
  "224, 242, 211",
  "250, 207, 243",
  "210, 237, 252",
  "250, 234, 175",
];

export interface SkillCategoryListProps {
  skills?: Maybe<SkillType_Member>[] | undefined;
  closeButton?: boolean;
  overflowNumber?: number;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill?: (val: Maybe<SkillType_Member> | undefined) => void;
}
export const SkillCategoryList: React.FC<SkillCategoryListProps> = ({
  skills,
  closeButton = false,
  // overflowNumber = 6,
  handleDeleteSkill,
}) => {
  // const [seeMore, setSeeMore] = useState(false);

  const _categories = skills?.reduce(
    (acc: any, skill: Maybe<SkillType_Member>) => {
      if (
        !skill?.skillInfo?.categorySkills ||
        !skill?.skillInfo?.categorySkills[0]?._id
      )
        return (acc["others"] = {
          name: "Others",
          skills: acc["others"] ? [...acc["others"].skills!, skill] : [skill],
        });

      acc[skill?.skillInfo?.categorySkills[0]._id] = !!acc[
        skill?.skillInfo?.categorySkills[0]._id
      ]
        ? {
            name: skill?.skillInfo?.categorySkills[0].name,
            skills: [
              ...acc[skill?.skillInfo?.categorySkills[0]._id].skills,
              skill,
            ],
          }
        : {
            name: skill?.skillInfo?.categorySkills[0].name,
            skills: [skill],
          };

      return acc;
    },
    {}
  );

  const badges = (_skills: Maybe<SkillType_Member>[], colorRGB: string) =>
    _skills?.map(
      (skill: Maybe<SkillType_Member> | undefined, index: number) => (
        <Badge
          key={index}
          text={trimParentheses(skill?.skillInfo?.name || "")}
          colorRGB={colorRGB}
          className={`font-Inter text-sm`}
          closeButton={closeButton}
          onClose={() => {
            if (handleDeleteSkill) handleDeleteSkill(skill);
          }}
          cutText={16}
        />
      )
    );

  return (
    <div>
      {Object.keys(_categories)?.map((categoryKey: any, index: number) => (
        <div key={index}>
          <TextHeading3>{_categories[categoryKey].name}:</TextHeading3>
          {badges(_categories[categoryKey].skills, colors[index % 4])}
        </div>
      ))}
    </div>
  );
};
