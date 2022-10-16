import {
  Button,
  Modal,
  RangeSlider,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export type SkillsType =
  | "experience"
  | "accountability"
  | "skillMatch"
  | "availability";

const SKILLS: { name: SkillsType; displayName: string }[] = [
  { name: "experience", displayName: "Experience" },
  { name: "accountability", displayName: "Accountability" },
  { name: "skillMatch", displayName: "Skill Match" },
  { name: "availability", displayName: "Availability" },
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
              <QuestionMarkCircleIcon className="-left-5 -top-3 h-5 w-5 text-gray-500 md:absolute" />
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
