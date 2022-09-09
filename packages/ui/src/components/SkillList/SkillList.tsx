/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
import React from "react";
import { Badge } from "ui";

export interface SkillListProps {
  skills: Maybe<SkillType_Member>[] | undefined;
  colorRGB?: string;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill?: (val: Maybe<SkillType_Member> | undefined) => void;
}
export const SkillList: React.FC<SkillListProps> = ({
  skills,
  colorRGB,
  handleDeleteSkill,
}) => {
  const badges = skills?.map(
    (skill: Maybe<SkillType_Member> | undefined, index: number) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        colorRGB={colorRGB}
        className={`font-Inter text-sm`}
        closeButton
        onClose={() => {
          if (handleDeleteSkill) handleDeleteSkill(skill);
        }}
        cutText={16}
      />
    )
  );

  return <div>{badges}</div>;
};
