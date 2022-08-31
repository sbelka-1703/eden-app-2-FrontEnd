import { Skills } from "@graphql/eden/generated";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Dropdown } from "ui";

// const skills = [
//   { _id: 1, name: "Skill 1" },
//   { _id: 2, name: "Skill 2" },
//   { _id: 3, name: "Skill 3" },
//   { _id: 4, name: "Skill 4" },
// ];

const colors = [
  "#c2f5e9",
  "#d1f7c4",
  "#ffeab6",
  "#fee2d5",
  "#ffdce5",
  "#ffdaf6",
  "#ede2fe",
  "#cfdfff",
];

interface ISkills {
  _id: string;
  name: string;
}

export interface SkillSelectorProps {
  // eslint-disable-next-line no-unused-vars
  onSetSkills?: (val: any) => void;
  showSelected?: boolean;
  value?: any[];
  options?: Array<Skills>;
}

export const SkillSelector = ({
  onSetSkills,
  showSelected,
  value = [],
  options = [],
}: SkillSelectorProps) => {
  const [selectedSkills, setSelectedSkills] = useState<ISkills[]>([]);

  const skillIsSelected = (skill: ISkills) => {
    if (!selectedSkills) return false;
    return selectedSkills.some(
      (selectedSkill: ISkills) => selectedSkill?._id === skill?._id
    );
  };

  const selectorSkills = options.filter((skill: Skills) => {
    if (skillIsSelected(skill as any)) return false;
    return skill.name?.toLowerCase().includes("");
  });

  const handleSelect = async (skill: ISkills) => {
    setSelectedSkills([...selectedSkills, skill]);
    onSetSkills && onSetSkills([...selectedSkills, skill]);
  };

  const handleDeleteClick = (skill: ISkills) => {
    setSelectedSkills(
      selectedSkills.filter((selected: ISkills) => selected?._id !== skill?._id)
    );
  };

  // useCallback hook might be a better choice here
  useEffect(() => {
    if (JSON.stringify(value) != JSON.stringify(selectedSkills)) {
      setSelectedSkills(value);
    }
  }, []);

  return (
    <div>
      <Dropdown
        items={selectorSkills}
        label={``}
        placeholder={`select skill`}
        onSelect={(val: any) => handleSelect(val)}
        multiple
      />

      {showSelected && (
        <section>
          {selectedSkills &&
            selectedSkills.map((skill: ISkills, index) => (
              <div
                className={`mr-2 mb-1 inline-block rounded-full bg-[${
                  colors[index % colors.length]
                }]`}
                key={index}
              >
                <div className="flex h-full w-full items-center justify-between px-3">
                  <>
                    {skill?.name && (
                      <span className="mr-2 mb-px">{skill.name}</span>
                    )}
                    <XIcon
                      className="inline-block h-4 w-4 cursor-pointer text-slate-600 hover:text-slate-400"
                      aria-hidden="true"
                      onClick={() => handleDeleteClick(skill)}
                    />
                  </>
                </div>
              </div>
            ))}
        </section>
      )}
    </div>
  );
};
