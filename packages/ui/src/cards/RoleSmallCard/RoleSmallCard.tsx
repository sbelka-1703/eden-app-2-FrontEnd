/* eslint-disable camelcase */
import { Maybe, RoleType, SkillRoleType } from "@graphql/eden/generated";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Badge, Card, TextHeading3 } from "ui";

export interface RoleSmallCardProps {
  role: Maybe<RoleType>;
  skills?: Maybe<SkillRoleType>[];
  isSelected: boolean;
  onClick?: () => void;
}

interface SkillListForRoleProps {
  skills: Maybe<SkillRoleType>[] | undefined;
  colorRGB?: string;
  closeButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOnClick?: () => void;
}
const SkillListForRole: React.FC<SkillListForRoleProps> = ({
  skills,
  colorRGB,
  // closeButton = false,
  // handleOnClick,
}) => {
  const [seeMore, setSeeMore] = useState(false);

  const badges = skills?.map(
    (skill: Maybe<SkillRoleType> | undefined, index: number) => (
      <Badge
        key={index}
        text={skill?.skillData?.name || ""}
        colorRGB={colorRGB}
        className={`font-Inter text-sm`}
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

export const RoleSmallCard = ({
  role,
  skills,
  isSelected,
  onClick,
}: RoleSmallCardProps) => {
  return (
    <div onClick={onClick}>
      <Card
        border
        focused={isSelected}
        shadow
        className="flex cursor-pointer flex-col items-start justify-start bg-white px-3 py-2"
      >
        <TextHeading3 className="font-poppins font-medium">
          {role?.title}
        </TextHeading3>
        <div>
          <SkillListForRole skills={skills} colorRGB="255, 255, 210" />
        </div>
      </Card>
    </div>
  );
};
