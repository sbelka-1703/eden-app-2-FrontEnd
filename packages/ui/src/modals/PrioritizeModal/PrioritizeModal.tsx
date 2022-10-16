import {
  Button,
  Modal,
  RangeSlider,
  TextBody,
  TextHeading3,
  Tooltip,
} from "@eden/package-ui";
import { useEffect, useState } from "react";

export type SkillsType =
  | "experience"
  | "accountability"
  | "skillMatch"
  | "availability";

const SKILLS: { name: SkillsType; tooltip: string; displayName: string }[] = [
  {
    name: "experience",
    displayName: "Experience",
    tooltip:
      "Allocating more points to ‘experience’ will prioritize matches who have proven track of record.",
  },
  {
    name: "accountability",
    displayName: "Accountability",
    tooltip:
      "Accountability is a complex atribute that combines previous experiences, collaborations and endorsements.",
  },
  {
    name: "skillMatch",
    displayName: "Skill Match",
    tooltip:
      "Skill match is an exact match between the sills you requested and one that caontributor possess.",
  },
  {
    name: "availability",
    displayName: "Availability",
    tooltip:
      "Allocating more points to ‘availability’ ensures you get matches, who can contribute most ammount of hours.",
  },
];

export interface PrioritizeModalProps {
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: {
    experience: number;
    accountability: number;
    skillMatch: number;
    availability: number;
  }) => void;
}

export const PrioritizeModal = ({
  onClose,
  openModal,
  onSubmit,
}: PrioritizeModalProps) => {
  const [range, setRange] = useState({
    experience: 0,
    accountability: 0,
    skillMatch: 0,
    availability: 0,
  });
  const [remaining, setRemaining] = useState(100);

  const handlePrioritized = (skill: string, range: number) => {
    setRange((prevState) => ({ ...prevState, [skill]: range }));
  };

  useEffect(() => {
    const remaining = Object.values(range).reduce((prev, curr) => {
      return prev - curr;
    }, 100);

    setRemaining(remaining);
  }, [range, remaining]);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <TextHeading3>Prioritise & distribute 100 points!</TextHeading3>
        <TextBody className={`font-medium text-gray-500`}>
          Please distribute 100 points based on the priority, more
          <br />
          points you give - more important the subject is to you.
        </TextBody>
        <div className="mx-auto my-8 flex max-w-md flex-col justify-center">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="relative flex flex-wrap items-baseline justify-between"
            >
              <Tooltip className="-left-5 -top-3 h-5 w-5 text-gray-500 md:absolute">
                {skill.tooltip}
              </Tooltip>
              <TextBody>{skill.displayName}</TextBody>
              <RangeSlider
                showNumbers
                max={range[skill.name] + remaining}
                className="max-w-xs"
                onChange={(val) => handlePrioritized(skill.name, val)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button radius="rounded" variant={`secondary`} onClick={onClose}>
            Back
          </Button>
          <Button
            radius="rounded"
            variant={`secondary`}
            onClick={() => onSubmit(range)}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
