// TODO: Create a test file for this component //

import { useQuery } from "@apollo/client";
import { FIND_ALL_CATEGORIES, SKILLS_AUTOCOMPLETE } from "@graphql/eden";
// eslint-disable-next-line camelcase
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
import { Combobox } from "@headlessui/react";
import { EmojiSadIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useMemo, useState } from "react";
import { Expandable } from "ui";

export interface SearchSkillProps {
  // eslint-disable-next-line camelcase
  skills: Maybe<Maybe<SkillType_Member>[]> | undefined;
  setSkills: any;
}

export const SearchSkill = ({ skills, setSkills }: SearchSkillProps) => {
  const [query, setQuery] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [inFocus, setInFocus] = useState<boolean>(false);

  const { data: dataSkills } = useQuery(SKILLS_AUTOCOMPLETE, {
    variables: {
      fields: {
        search: query,
      },
    },
    skip: !query,
  });

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

  // @ts-ignore
  const allSkillGroup = AllCategoery?.reduce((groups, item) => {
    return {
      ...groups,
      // @ts-ignore
      [item.category!]: [...(groups[item.category] || []), item],
    };
  }, {});

  return (
    <Combobox
      // @ts-ignore
      value={skills}
      // @TODO remove this any
      onChange={(item: any) => {
        setIsOpen(item._id === item._id);
        setSelected(item._id || null);
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
          className="h-12 w-full rounded-md border-0 bg-white pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search for a skill.."
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setInFocus(true)}
        />
      </div>

      {filteredItems.length >= 0 && query.length >= 0 && (
        <Combobox.Options
          static
          className="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
        >
          {Object.entries(
            query === "" && inFocus ? allSkillGroup : groups!
          ).map(([category, id]) => (
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
              setExpanding={(e: boolean) => setInFocus(e)}
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
