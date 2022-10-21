/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_ALL_CATEGORIES } from "@eden/package-graphql";
import {
  Maybe,
  SkillCategory,
  SkillSubCategory,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { Button, Modal, SkillList, TextHeading3 } from "@eden/package-ui";
import { useState } from "react";

import { BadgeSelector } from "../../selectors/BadgeSelector";

export interface ISkillsSubcategoryModalProps {
  categories: SkillCategory[];
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (val: any[]) => void;
}

const colors = [
  "224, 242, 211",
  "250, 207, 243",
  "210, 237, 252",
  "250, 234, 175",
];

export const SkillsSubcategoryModal = ({
  categories = [],
  isOpen,
  onSubmit,
}: ISkillsSubcategoryModalProps) => {
  const [selected, setSelected] = useState<any[]>(
    categories.map((category) => ({ ...category, subCategorySkill: [] }))
  );
  const [deleted, setDeleted] = useState<any[]>([]);

  const handleChange = (category: SkillCategory, val: SkillSubCategory[]) => {
    const newSelected = categories.map((_category) => {
      if (category._id === _category?._id) {
        return {
          ..._category,
          subCategorySkill: _category?.subCategorySkill?.filter(
            (subcategory: Maybe<SkillSubCategory>) => {
              return val.some(
                (_subcategory) => _subcategory?._id === subcategory?._id
              );
            }
          ),
        };
      }
      return selected.find((__category) => __category?._id === _category?._id);
    });

    setSelected(newSelected);
  };

  // eslint-disable-next-line no-unused-vars
  const { data: subcategories, loading: subcategoriesLoading } = useQuery(
    FIND_ALL_CATEGORIES,
    {
      variables: {
        fields: {
          _id: ([] as Array<any>).concat(
            ...selected?.map((category) =>
              category?.subCategorySkill?.map(
                (subCategory: SkillSubCategory) => subCategory?._id
              )
            )!
          ),
        },
      },
      // skip: !selectedCategories?.some(
      //   (category) => category.subCategorySkill
      // ),
      context: { serviceName: "soilservice" },
      onCompleted: (data: any) => {
        const newSelected = selected.map(
          (category) =>
            ({
              ...category,
              skills: ([] as any[]).concat(
                ...(data?.findSkillSubCategories || [])
                  .filter((subcategory: SkillSubCategory) =>
                    category.subCategorySkill?.some(
                      (_subcategory: any) =>
                        subcategory?._id === _subcategory?._id
                    )
                  )
                  .map((subcategory: SkillSubCategory) =>
                    subcategory?.skills?.filter(
                      (skill: any) =>
                        !deleted.some(
                          (_skill) => skill._id === _skill?.skillInfo?._id
                        )
                    )
                  )
              ),
            } as SkillCategory)
        );

        setSelected(newSelected);
      },
    }
  );

  const handleDeleteSkill = (skill: Maybe<SkillType_Member> | undefined) => {
    const newSelected = selected.map((_category) => {
      return {
        ..._category,
        skills: _category?.skills.filter(
          (_skill: any) => _skill?._id !== skill?.skillInfo?._id
        ),
      };
    });

    setDeleted([...deleted, skill]);
    setSelected(newSelected);
  };

  return (
    <div>
      <Modal open={isOpen} closeOnEsc={false}>
        <div className={`h-1/2`}>
          <TextHeading3 className="mb-4">Select subcategories:</TextHeading3>
          <section className="mb-4">
            {categories.map((category, index) => (
              <div key={index}>
                <TextHeading3 className="mb-4">{category?.name}</TextHeading3>
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <BadgeSelector
                      items={category?.subCategorySkill || []}
                      onChange={(val) => handleChange(category, val)}
                    />
                  </div>
                  <div className="col-span-1">
                    <SkillList
                      skills={selected
                        ?.find((_category) => _category?._id === category?._id)
                        ?.skills?.map((skill: any) => ({
                          skillInfo: {
                            _id: skill?._id,
                            name: skill?.name,
                          },
                        }))}
                      closeButton
                      handleDeleteSkill={handleDeleteSkill}
                      colorRGB={colors[index % 4]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className={"flex justify-center"}>
          <Button
            className="items-start justify-center"
            variant={`primary`}
            onClick={() => onSubmit(selected)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};
