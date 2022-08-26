import React, { useEffect, useState } from "react";
import { Badge } from "../../elements/Badge/Badge";
import { Card } from "../../elements/Card/Card";

type ISkill = {
  colorRGB: string;
  text: string;
  closeButton?: boolean;
};
export interface SkillsCardProps {
  skills?: ISkill[];
  shadow?: boolean;
  onSelect?: (data: ISkill) => void;
}
export const SkillsCard: React.FC<SkillsCardProps> = ({
  skills,
  shadow,
  onSelect,
}) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);
  const selectedSkill = skills?.[selectedSkillIndex];
  useEffect(() => {
    if (onSelect && selectedSkill) {
        onSelect(selectedSkill);
    }
  }, [selectedSkillIndex])

  const handleOnClick = (index: number) => {
    setSelectedSkillIndex(index);
  };

  return (
    <Card shadow={shadow}>
      <ul className="flex flex-wrap items-center justify-start">
        {skills?.map((skill: ISkill, index: number) => (
          <li key={index} className="mb-1" onClick={() => handleOnClick(index)}>
            <Badge
              colorRGB={skill?.colorRGB}
              text={skill.text}
              closeButton={skill?.closeButton}
              onClose={() => handleOnClick(index)}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
};
