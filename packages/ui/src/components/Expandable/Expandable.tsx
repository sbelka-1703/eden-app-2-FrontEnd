import { useQuery } from "@apollo/client";
import { FIND_SKILL_BY_CATEGORIES } from "@graphql/eden";
// eslint-disable-next-line camelcase
import { Maybe, Skills, SkillType_Member } from "@graphql/eden/generated";
import { useState } from "react";
import { Button } from "ui";

type SelectorProps = {
  title: string;
  onClick: () => void;
};

type LevelProp = {
  title: string;
  level: string;
};

function Selector({ title, onClick }: SelectorProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md border-[2px] border-black bg-white p-2 text-[14px] font-semibold transition-all duration-500 hover:bg-black hover:text-white"
    >
      {title}
    </div>
  );
}

type ExpandableProps = {
  category: string;
  // eslint-disable-next-line camelcase
  skills?: Maybe<SkillType_Member>[];
  allSkills?: Skills[];
  isOpen?: boolean;
  selected: string | null;
  setSkills?: any;
  setIsOpen?: any;
  setSelected?: any;
  id: string;
  query: string;
  setExpanding?: any;
  levels: LevelProp[];
};

export const Expandable = ({
  category,
  skills,
  isOpen,
  selected,
  allSkills,
  setSkills,
  setIsOpen,
  setSelected,
  id,
  query,
  setExpanding,
  levels,
}: ExpandableProps) => {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string | null>(null);

  const useGetSkills = (id: string) => {
    const { data: allSkillsByCategory } = useQuery(FIND_SKILL_BY_CATEGORIES, {
      variables: {
        fields: { _id: id },
      },
      skip: !id,
    });

    return allSkillsByCategory
      ? allSkillsByCategory.findSkillSubCategory.skills
      : [];
  };

  const fetchedSkills = useGetSkills(idSelected!);

  return (
    <div className="w-full">
      <div
        onClick={() => {
          setIsExpandingOpen(!isExandingOpen);
          if (query === "") {
            setIdSelected(id);
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between bg-[#ffffff] px-3 py-2 font-bold"
      >
        {category}
        <p className="underline">{isExandingOpen ? "Hide" : "Show"}</p>
      </div>
      {isExandingOpen &&
        (query === ""
          ? fetchedSkills
          : allSkills?.filter(
              (s: any) => s.subCategorySkill[0].name === category
            )
        ).map((item: any) => (
          <div
            onClick={() => {
              if (
                skills!.filter((s) => s?.skillInfo?._id === item._id).length > 0
              ) {
                return;
              } else {
                setSelected(item._id);
                setIsOpen(true);
                if (isOpen) {
                  setSelected(null);
                  setIsOpen(false);
                }
              }
            }}
            className="cursor-pointer p-2"
            key={item._id}
          >
            <div
              className={`flex ${
                selected === item._id ? "bg-[#EDF2F7]" : "bg-white"
              } items-center justify-between px-4 pt-4`}
            >
              {item.name}
              {skills!.filter((s) => s?.skillInfo?._id === item._id).length >
                0 && <h1>ADDED</h1>}
            </div>

            {isOpen && selected === item._id && (
              <div className="bg-[#EDF2F7] px-4 pb-4 pt-2">
                <p className="font-semibold text-[#AAAAAA]">Skill level</p>
                <div className="flex gap-2">
                  {levels.map((level, index) => (
                    <Selector
                      key={index}
                      title={level.title.toUpperCase()}
                      onClick={() => {
                        setSkills([
                          ...skills!,
                          {
                            skillInfo: {
                              _id: item._id,
                              name: item.name,
                            },
                            level: level.level,
                          },
                        ]);
                        setIsOpen(false);
                        setExpanding(false);
                      }}
                    />
                  ))}
                  <Button
                    onClick={() => {
                      setSkills([
                        ...skills!,
                        {
                          skillInfo: {
                            _id: item._id,
                            name: item.name,
                          },
                          level: "mid",
                        },
                      ]);
                      setIsOpen(false);
                      setExpanding(false);
                    }}
                    variant="primary"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
