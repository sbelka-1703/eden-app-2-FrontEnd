/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_SUBCATEGORIES_OF_CATEGORIES } from "@eden/package-graphql";
import {
  Maybe,
  Skills,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { useEffect, useState } from "react";

import { Expandable } from "../Expandable/Expandable";

type LevelProp = {
  title: string;
  level: string;
};

type ExpandableProps = {
  category: string;
  skills?: Maybe<SkillType_Member>[];
  allSkills?: Skills[];
  isOpen?: boolean;
  selected: string | null;
  setSkills?: any;
  setIsOpen?: any;
  dataSkills: any;
  setSelected?: any;
  id: string;
  query: string;
  levels?: LevelProp[];
  isExpandingOpenByDefault?: boolean;
};

export const CategoryExpandable = ({
  category,
  skills,
  isOpen,
  selected,
  setSkills,
  setIsOpen,
  setSelected,
  dataSkills,
  id,
  levels,
  query,
  isExpandingOpenByDefault = false,
}: ExpandableProps) => {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(
    isExpandingOpenByDefault
  );
  const [idSelected, setIdSelected] = useState<string | null>(null);

  const useGetSubCategories = (id: string) => {
    const { data: allSubCategoriesbyId } = useQuery(
      FIND_SUBCATEGORIES_OF_CATEGORIES,
      {
        variables: {
          fields: { _id: id },
        },
        skip: !id,
      }
    );

    return allSubCategoriesbyId
      ? allSubCategoriesbyId?.findSkillCategory.subCategorySkill
      : [];
  };

  const fetchedSubCategories = useGetSubCategories(idSelected!);

  useEffect(() => {
    // console.log("selected id", idSelected);
    // console.log("fetchedSubCategories", fetchedSubCategories);
  }, [idSelected, fetchedSubCategories]);
  useEffect(() => {
    query !== "" &&
      console.log(
        "searched sub categories",
        dataSkills?.skills_autocomplete[0]
      );
  }, [query, dataSkills]);
  return (
    <div className="w-full">
      <div
        onClick={() => {
          setIsExpandingOpen(!isExandingOpen);
          if (query === "") {
            setIdSelected(id);
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between bg-[#b7b7b7] px-3 py-2 text-sm"
      >
        {category}
        <p className="text-xs font-medium underline">
          {isExandingOpen ? "HIDE" : "SHOW"}
        </p>
      </div>
      {isExandingOpen &&
        (query === ""
          ? fetchedSubCategories
          : dataSkills.skills_autocomplete[0].subCategorySkill
        )?.map((s: any, index: number) => (
          <Expandable
            query={query}
            category={s.name}
            id={s._id}
            skills={skills!}
            allSkills={query !== "" && dataSkills.skills_autocomplete}
            isOpen={isOpen}
            selected={selected}
            setIsOpen={setIsOpen}
            setSkills={setSkills}
            key={index}
            setSelected={setSelected}
            // setExpanding={(e: boolean) => setInFocus(e)}
            levels={levels}
            isExpandingOpenByDefault={query == "" ? false : !index}
          />
        ))}
    </div>
  );
};
