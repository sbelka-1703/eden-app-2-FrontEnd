// TODO: Create a test file for this component //

import { useQuery } from "@apollo/client";
import { FIND_ALL_SKILLS, SKILLS_AUTOCOMPLETE } from "@graphql/eden";
import { Combobox } from "@headlessui/react";
import { EmojiSadIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useMemo, useState } from "react";

type SelectorProps = {
  title: string;
  onClick: () => void;
};

function Selector({ title, onClick }: SelectorProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md border-[1px] border-black p-2 transition-all duration-500 hover:bg-black hover:text-white"
    >
      {title}
    </div>
  );
}

type ExpandableProps = {
  category: string;
  skills: SelectedSkill[];
  allSkills: Skills[];
  isOpen: boolean;
  selected: number | null;
  setSkills: any;
  setIsOpen: any;
  setSelected: any;
};

function Expandable({
  category,
  allSkills,
  skills,
  isOpen,
  selected,
  setSkills,
  setIsOpen,
  setSelected,
}: ExpandableProps) {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div
        onClick={() => setIsExpandingOpen(!isExandingOpen)}
        className="flex w-full cursor-pointer items-center justify-between bg-[#ffffff] px-3 py-2 font-bold"
      >
        {category}
        <p className="underline">{isExandingOpen ? "Hide" : "Show"}</p>
      </div>
      {isExandingOpen &&
        allSkills.map((item) => (
          <div
            onClick={() => {
              if (skills.filter((s) => s.id === item._id).length > 0) {
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
              {skills.filter((s) => s.id === item._id).length > 0 && (
                <h1>ADDED</h1>
              )}
            </div>

            {isOpen && selected === item._id && (
              <div className="bg-[#EDF2F7] px-4 pb-4 pt-2">
                <p className="font-semibold text-[#AAAAAA]">Skill level</p>
                <div className="flex gap-2">
                  <Selector
                    title="Interested"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "interested",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Learning"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "learning",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Junior"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "junior",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Mid"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "mid",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Senior"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "senior",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />

                  <button
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "unknown",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                    className={`ml-auto  mr-2 rounded-md bg-green-400 px-3 transition-all duration-500 hover:bg-green-800 hover:text-white`}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

type Skills = {
  _id: number;
  name: string;
  category?: string;
};

type SelectedSkill = {
  id: number;
  name: string;
  skillLevel: string;
};

export interface SearchBarProps {
  allSkills?: Skills[];
  skills?: SelectedSkill[];
  setSkills?: any;
}

export const SearchBar = ({ skills, setSkills }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [inFocus, setInFocus] = useState<boolean>(false);

  const { data: dataSkills } = useQuery(SKILLS_AUTOCOMPLETE, {
    variables: {
      fields: {
        search: query,
      },
    },
  });

  const { data: AllSkillsData, loading: AllSkillsDataLoading } =
    useQuery(FIND_ALL_SKILLS);

  const AllSkillWithCategoery: Skills[] = useMemo(() => [], []);

  useEffect(() => {
    if (AllSkillsData && AllSkillsDataLoading === false) {
      AllSkillsData.findSkillSubCategories.forEach((skill: any) => {
        const category = skill.name;

        skill.skills.forEach((s: Skills) => {
          AllSkillWithCategoery.push({
            _id: s._id,
            name: s.name,
            category: category,
          });
        });
      });
    }
  }, [AllSkillsData, AllSkillsDataLoading]);

  // useEffect(() => {
  //   console.log("All skills=====================", AllSkillWithCategoery);
  // }, [AllSkillWithCategoery]);

  const filteredItems = dataSkills
    ? dataSkills.skills_autocomplete?.filter((item: any) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  // @ts-ignore
  const groups = filteredItems?.reduce((groups, item) => {
    return {
      ...groups,
      // @ts-ignore
      [item.subCategorySkill[0].name!]: [
        ...(groups[item.subCategorySkill[0].name!] || []),
        item,
      ],
    };
  }, {});

  const allSkillGroup = AllSkillWithCategoery?.reduce((groups, item) => {
    return {
      ...groups,
      // @ts-ignore
      [item.category!]: [...(groups[item.category] || []), item],
    };
  }, {});

  return (
    <Combobox
      // @ts-ignore
      onChange={(item: Skills) => {
        setIsOpen(item._id === item._id);
        setSelected(item._id);
        if (isOpen) {
          setIsOpen(false);
          setSelected(null);
        }
      }}
    >
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <Combobox.Input
          style={{
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
          }}
          className="h-12 w-[25rem] rounded-md border-0 bg-white pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search for a skill.."
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setInFocus(true)}
          // onBlur={() => {
          //   setInFocus(false);
          // }}
        />
      </div>

      {filteredItems.length >= 0 && query.length >= 0 && (
        <Combobox.Options
          static
          className="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
        >
          {Object.entries(
            inFocus && query === "" ? allSkillGroup : groups!
          ).map(([category]) => (
            <Expandable
              category={category}
              // @ts-ignore
              allSkills={
                inFocus && query === ""
                  ? AllSkillWithCategoery
                  : dataSkills.skills_autocomplete
              }
              skills={skills!}
              isOpen={isOpen}
              selected={selected}
              setIsOpen={setIsOpen}
              setSkills={setSkills}
              key={category}
              setSelected={setSelected}
            />
          ))}
        </Combobox.Options>
      )}

      {query !== "" && filteredItems!.length === 0 && (
        <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
          <EmojiSadIcon
            className="mx-auto h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
          <p className="mt-4 font-semibold text-gray-900">No results found</p>
          <p className="mt-2 text-gray-500">
            We couldn’t find anything with that term. Please try again.
          </p>
        </div>
      )}
    </Combobox>
  );
};
