/* eslint-disable camelcase */
import { Maybe, SkillType_Member } from "@eden/package-graphql/generated";
import { Badge, Card } from "@eden/package-ui";
import React, { useEffect, useState } from "react";

export interface SkillsCardProps {
  skills?: Maybe<Maybe<SkillType_Member>[]>;
  title?: string;
  shadow?: boolean;
  closeButton?: boolean;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (index: number) => void;
}
export const SkillsCard: React.FC<SkillsCardProps> = ({
  skills,
  title,
  shadow,
  closeButton,
  className = "p-0",
  onSelect,
}) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);
  // const selectedSkill = skills?.[selectedSkillIndex];

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedSkillIndex);
    }
  }, [selectedSkillIndex]);

  const handleOnClick = (index: number) => {
    setSelectedSkillIndex(index);
  };

  // if (skills) console.log("skills", skills);

  const getRandomColor = () => {
    const colors = [
      "120, 238, 203, 0.5",
      "255, 146, 205, 0.4",
      "255, 242, 104, 0.5",
      "155, 103, 255, 0.44",
      "136, 169, 255, 0.5",
      "83, 212, 240, 0.4",
      "168, 253, 82, 0.4",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card shadow={shadow} className={`${className}`}>
      {title && (
        <div
          className={`font-Inter pb-4 text-center text-lg uppercase text-zinc-500`}
        >
          {title}
        </div>
      )}
      <ul className="flex flex-wrap items-center justify-start">
        {skills?.map((skill: Maybe<SkillType_Member>, index: number) => (
          <li key={index} className="mb-1" onClick={() => handleOnClick(index)}>
            <Badge
              colorRGB={getRandomColor()}
              className={`font-Inter text-sm`}
              text={skill?.skillInfo?.name || "nothing"}
              closeButton={closeButton}
              onClose={() => handleOnClick(index)}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
};
