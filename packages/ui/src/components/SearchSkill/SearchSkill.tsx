// TODO: Create a test file for this component //

import { useQuery } from "@apollo/client";
import {
  FIND_ALL_CATEGORIES,
  SKILLS_AUTOCOMPLETE,
} from "@eden/package-graphql";
// eslint-disable-next-line camelcase
import { Maybe, SkillType_Member } from "@eden/package-graphql/generated";
import { Combobox } from "@headlessui/react";
import { EmojiSadIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useMemo, useState } from "react";
import { Expandable, Loading } from "ui";

type LevelProp = {
  title: string;
  level: string;
};

export interface SearchSkillProps {
  // eslint-disable-next-line camelcase
  skills: Maybe<Maybe<SkillType_Member>[]> | undefined;
  setSkills: any;
  levels: LevelProp[];
}

export const SearchSkill = ({
  skills,
  setSkills,
  levels,
}: SearchSkillProps) => {
  const [query, setQuery] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [inFocus, setInFocus] = useState<boolean>(false);

  const { data: dataSkills, loading: skillLoading } = useQuery(
    SKILLS_AUTOCOMPLETE,
    {
      variables: {
        fields: {
          search: query,
        },
      },
      skip: !query,
    }
  );

  const { data: AllSkillsData, loading: AllSkillsDataLoading } =
    useQuery(FIND_ALL_CATEGORIES);

  const AllCategoery: any = useMemo(() => [], []);

  useEffect(() => {
    if (AllSkillsData && AllSkillsDataLoading === false) {
      AllSkillsData.findSkillSubCategories.forEach((skill: any) => {
        AllCategoery.push({
          _id: skill._id,
          category: skill.name,
        });
      });
    }
  }, [AllSkillsData, AllSkillsDataLoading]);

  const filteredItems = dataSkills
    ? dataSkills.skills_autocomplete?.filter((item: any) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  const groups = filteredItems?.reduce((groups: any, item: any) => {
    return {
      ...groups,
      [item.subCategorySkill[0].name!]: [
        ...(groups[item.subCategorySkill[0].name!] || []),
        item,
      ],
    };
  }, {});

  const allSkillGroup = AllCategoery?.reduce((groups: any, item: any) => {
    return {
      ...groups,
      [item.category!]: [...(groups[item.category] || []), item],
    };
  }, {});

  useEffect(() => {
    if (dataSkills?.length > 0) {
      setSelected(dataSkills[0]._id);
    }
  }, [dataSkills]);

  return (
    <Combobox
      value={skills}
      // TODO: remove this any
      onChange={(item: any) => {
        setIsOpen(item._id === item._id);
        setSelected(item._id || null);
        if (isOpen) {
          setIsOpen(false);
          setSelected(null);
        }
      }}
    >
      <div className="relative mt-1 mb-4">
        <div className="relative z-30">
          <SearchIcon
            className="pointer-events-none absolute top-2.5 left-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            style={{
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
            }}
            className="h-10 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search for a skill.."
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              setInFocus(true);
              setIsOpen(true);
            }}
          />
        </div>
        {filteredItems.length >= 0 && query.length >= 0 && isOpen && (
          <div
            className="fixed top-0 left-0 z-20 h-screen w-screen"
            onClick={() => {
              setIsOpen(false);
              setInFocus(false);
            }}
          ></div>
        )}

        {skillLoading && isOpen && (
          <div className="absolute top-12 z-40 border-t border-gray-100 bg-white py-14 px-6 text-center text-sm sm:px-14">
            <Loading />
          </div>
        )}

        {filteredItems.length >= 0 && query.length >= 0 && isOpen && (
          <Combobox.Options
            static
            className="scrollbar-hide absolute top-12 z-30 h-80 w-full scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto rounded-md border bg-white pb-2 shadow-lg"
          >
            {Object.entries(
              query === "" && inFocus ? allSkillGroup : groups!
            ).map(([category, id], index) => (
              <Expandable
                query={query}
                category={category}
                // @ts-ignore
                id={id[0]._id}
                skills={skills!}
                allSkills={query !== "" && dataSkills.skills_autocomplete}
                isOpen={isOpen}
                selected={selected}
                setIsOpen={setIsOpen}
                setSkills={setSkills}
                key={category}
                setSelected={setSelected}
                // setExpanding={(e: boolean) => setInFocus(e)}
                levels={levels}
                isExpandingOpenByDefault={query == "" ? false : !index}
              />
            ))}
          </Combobox.Options>
        )}

        {dataSkills?.skills_autocomplete.length <= 0 &&
          query !== "" &&
          filteredItems!.length === 0 &&
          isOpen && (
            <div className="absolute top-12 z-30 border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
              <EmojiSadIcon
                className="mx-auto h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <p className="mt-4 font-semibold text-gray-900">No skill found</p>
              <p className="mt-2 text-gray-500">
                We couldn’t find anything with that term. Please try again.
              </p>
            </div>
          )}
      </div>
    </Combobox>
  );
};
