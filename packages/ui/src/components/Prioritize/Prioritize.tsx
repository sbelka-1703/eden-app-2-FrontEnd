import {
  BatteryStepper,
  Button,
  Modal,
  RangeSlider,
  TextBody,
  TextHeading3,
  Tooltip,
  UserAttributeChart,
} from "@eden/package-ui";
import { useEffect, useState } from "react";

export type SkillTypes =
  | "experience"
  | "accountability"
  | "skillMatch"
  | "availability";

const SKILLS: { name: SkillTypes; tooltip: string; displayName: string }[] = [
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

export interface PrioritizeProps {
  openModal?: boolean;
  onPrev: () => void;
  battery?: boolean;
  numMatches?: number | string;
  batteryPercentage?: number;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: {
    experience: number;
    accountability: number;
    skillMatch: number;
    availability: number;
  }) => void;
}

export const Prioritize = ({
  onPrev,
  battery = false,
  batteryPercentage = 75,
  openModal,
  onNext,
  numMatches,
}: PrioritizeProps) => {
  const [range, setRange] = useState({
    experience: 20,
    accountability: 20,
    skillMatch: 20,
    availability: 20,
  });
  const [remaining, setRemaining] = useState(400);

  const handlePrioritized = (skill: string, range: number) => {
    setRange((prevState) => ({ ...prevState, [skill]: range }));
  };

  const handleBack = () => {
    if (onPrev) onPrev!();
  };
  useEffect(() => {
    const remaining = Object.values(range).reduce((prev, curr) => {
      return prev - curr;
    }, 400);

    setRemaining(remaining);
  }, [range, remaining]);

  return (
    <>
      {openModal && (
        <div>
          <div className="flex justify-between">
            <div className="flex-1">
              <TextHeading3>Let me get your priorities straight.</TextHeading3>
              <TextBody className={`font-medium text-gray-500`}>
                On a scale from 0 to 100, how would you rate the importance to
                each attribute
              </TextBody>
            </div>
          </div>

          <div className="my-8 ml-4 flex w-full max-w-lg flex-col justify-center">
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
                  defaultValue={range[skill.name]}
                  showNumbers
                  max={range[skill.name] + remaining}
                  className="max-w-xs"
                  onChange={(val) => handlePrioritized(skill.name, val)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button radius="rounded" variant={`secondary`} onClick={handleBack}>
              Prev
            </Button>
            <Button
              radius="rounded"
              variant={`secondary`}
              onClick={() => onNext(range)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
