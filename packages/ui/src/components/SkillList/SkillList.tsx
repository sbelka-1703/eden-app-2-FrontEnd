/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Badge } from "ui";

export interface SkillListProps {
  skills: Maybe<SkillType_Member>[] | undefined;
  colorRGB?: string;
  closeButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSkill?: (val: Maybe<SkillType_Member> | undefined) => void;
}
export const SkillList: React.FC<SkillListProps> = ({
  skills,
  colorRGB,
  closeButton = false,
  handleDeleteSkill,
}) => {
  const [seeMore, setSeeMore] = useState(false);

  const badges = skills?.map(
    (skill: Maybe<SkillType_Member> | undefined, index: number) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
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
      <div>
        {badges?.slice(0, 6)}
        {seeMore ? badges?.slice(6) : null}
      </div>
      {badges && badges.length > 6 && (
        <p
          className="cursor-pointer text-center text-sm"
          onClick={() => setSeeMore(!seeMore)}
        >
          {`see ${seeMore ? "less" : "more"} skills`}
          <span>
            {seeMore ? (
              <ChevronUpIcon width={16} className="ml-2 inline" />
            ) : (
              <ChevronDownIcon width={16} className="ml-2 inline" />
            )}
          </span>
        </p>
      )}
    </div>
  );
};
