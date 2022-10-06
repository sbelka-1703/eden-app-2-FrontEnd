// eslint-disable-next-line camelcase
import { useQuery } from "@apollo/client";
import { FIND_SUBCATEGORIES_OF_CATEGORIES } from "@graphql/eden";
// eslint-disable-next-line camelcase
import { Maybe, Skills, SkillType_Member } from "@graphql/eden/generated";
import React, { useEffect, useState } from "react";
import { Expandable } from "ui";

type LevelProp = {
  title: string;
  level: string;
};

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
  levels?: LevelProp[];
  isExpandingOpenByDefault?: boolean;
};

export const CategoryExpandable = ({
  category,
  skills,
  isOpen,
  selected,
  allSkills,
  setSkills,
  setIsOpen,
  setSelected,
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

    console.log(
      "allSubCategoryId",
      allSubCategoriesbyId?.findSkillCategory.subCategorySkill
    );

    return allSubCategoriesbyId
      ? allSubCategoriesbyId?.findSkillCategory.subCategorySkill
      : [];
  };

  const fetchedSubCategories = useGetSubCategories(idSelected!);

  useEffect(() => {
    console.log("selected id", idSelected);
    console.log("fetchedSubCategories", fetchedSubCategories);
  }, [idSelected, fetchedSubCategories]);

  return (
    <div className="w-full">
      <div
        onClick={() => {
          setIsExpandingOpen(!isExandingOpen);
          if (query === "") {
            setIdSelected(id);
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between bg-[#EDF2F7] px-3 py-2 text-sm"
      >
        {category}
        <p className="text-xs font-medium underline">
          {isExandingOpen ? "HIDE" : "SHOW"}
        </p>
      </div>
      {isExandingOpen &&
        fetchedSubCategories?.map((s: any, index) => (
          <Expandable
            query={query}
            category={s.name}
            // @ts-ignore
            id={s._id}
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
    </div>
  );
};
