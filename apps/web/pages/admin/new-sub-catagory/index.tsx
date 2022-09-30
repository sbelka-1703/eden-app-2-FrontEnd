/* eslint-disable camelcase */
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  FIND_SKILL_CATEGORIES,
  UPDATE_SKILL_CATEGORY,
  UPDATE_SKILL_SUB_CATEGORY,
} from "@eden/package-graphql";
import {
  Maybe,
  SkillCategory,
  SkillSubCategory,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import {
  AppPublicLayout,
  Button,
  GridItemFour,
  GridLayout,
  SearchSkill,
  SkillList,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const AdminPanelToAddNewSubCatagory: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [categories, setCategories] =
    useState<Maybe<Array<Maybe<SkillCategory>>>>();
  const [selectedCategory, setSelectedCategory] =
    useState<Maybe<SkillCategory>>();

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Maybe<SkillSubCategory>>();

  const [selectedSkills, setSelectedSkills] = useState<
    Maybe<SkillType_Member>[]
  >([]);
  const [deletedSkill, setDeletedSkill] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);
  const [newSubCategory, setNewSubCategory] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loading, error, refetch } = useQuery(FIND_SKILL_CATEGORIES, {
    variables: {
      fields: {
        _id: null,
      },
    },
    onCompleted: (data) => {
      setCategories(data.findSkillCategories);
    },
  });

  const [updateSkillCategory] = useMutation(UPDATE_SKILL_CATEGORY);
  const [updateSkillSubCategory] = useMutation(UPDATE_SKILL_SUB_CATEGORY);

  const handleUpdateCategory = async () => {
    setIsLoading(true);
    if (
      selectedCategory &&
      selectedSubCategory &&
      (selectedSkills.length > 0 || deletedSkill) &&
      !newCategory &&
      !newSubCategory
    ) {
      await updateSkillSubCategory({
        variables: {
          fields: {
            _id: selectedSubCategory._id,
            skills: [
              ...selectedSkills.map((skill) => skill?.skillInfo?._id),
              ...selectedSubCategory.skills!.map(
                (subCatSkill) => subCatSkill?._id
              ),
            ],
          },
        },
      });
      // eslint-disable-next-line no-unused-vars
      const { data: finalData } = await updateSkillCategory({
        variables: {
          fields: {
            _id: selectedCategory._id,
            skills: [
              ...selectedSkills.map((skill) => skill?.skillInfo?._id),
              ...selectedCategory.skills!.map(
                (subCatSkill) => subCatSkill?._id
              ),
            ],
          },
        },
        onCompleted: () => {
          setSelectedCategory(null);
          setDeletedSkill(false);
          setSelectedSubCategory(null);
          setSelectedSkills([]);
          setNewCategory(false);
          setNewSubCategory(false);
        },
      });
    } else if (
      selectedCategory &&
      selectedSubCategory &&
      (selectedSkills.length > 0 || deletedSkill) &&
      !newCategory &&
      newSubCategory
    ) {
      const { data } = await updateSkillSubCategory({
        variables: {
          fields: {
            name: selectedSubCategory.name,
            skills: [...selectedSkills.map((skill) => skill?.skillInfo?._id)],
            categorySkills: [selectedCategory._id],
          },
        },
        onCompleted: (data) => {
          setSelectedSubCategory(data.updateSkillSubCategory);
        },
      });
      const tempSubCategory = data.updateSkillSubCategory;

      // eslint-disable-next-line no-unused-vars
      const { data: finalData } = await updateSkillCategory({
        variables: {
          fields: {
            _id: selectedCategory._id,
            skills: [
              ...selectedSkills.map((skill) => skill?.skillInfo?._id),
              ...selectedCategory.skills!.map(
                (subCatSkill) => subCatSkill?._id
              ),
            ],
            subCategorySkill: [
              ...selectedCategory.subCategorySkill!.map(
                (subCat) => subCat?._id
              ),
              tempSubCategory._id!,
            ],
          },
        },
        onCompleted: () => {
          setSelectedCategory(null);
          setDeletedSkill(false);
          setSelectedSubCategory(null);
          setSelectedSkills([]);
          setNewCategory(false);
          setNewSubCategory(false);
        },
      });
    } else if (
      selectedCategory &&
      selectedSubCategory &&
      (selectedSkills.length > 0 || deletedSkill) &&
      newCategory
    ) {
      const { data: skillCat } = await updateSkillCategory({
        variables: {
          fields: {
            name: selectedCategory.name,
          },
        },
        onCompleted: (data) => {
          setSelectedCategory(data.updateSkillCategory);
        },
      });

      const tempCategory = skillCat.updateSkillCategory;
      const { data: skillSubCat } = await updateSkillSubCategory({
        variables: {
          fields: {
            name: selectedSubCategory.name,
            skills: [...selectedSkills.map((skill) => skill?.skillInfo?._id)],
            categorySkills: [tempCategory._id],
          },
        },
        onCompleted: (data) => {
          setSelectedSubCategory(data.updateSkillSubCategory);
        },
      });

      const tempSubCategory = skillSubCat.updateSkillSubCategory;

      // eslint-disable-next-line no-unused-vars
      const { data: finalData } = await updateSkillCategory({
        variables: {
          fields: {
            _id: tempCategory._id,
            skills: [...selectedSkills.map((skill) => skill?.skillInfo?._id)],
            subCategorySkill: [tempSubCategory._id!],
          },
        },
        onCompleted: () => {
          setSelectedCategory(null);
          setDeletedSkill(false);
          setSelectedSubCategory(null);
          setSelectedSkills([]);
          setNewCategory(false);
          setNewSubCategory(false);
        },
      });
    }
    setSelectedCategory(null);
    setDeletedSkill(false);
    setSelectedSubCategory(null);
    setSelectedSkills([]);
    setNewCategory(false);
    setNewSubCategory(false);
    await refetch();
    setIsLoading(false);
  };

  interface ISkillSubCategorySelectorProps {
    subCategories: Maybe<Array<Maybe<SkillSubCategory>>>;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onSelect?: (val: Maybe<SkillSubCategory>) => void;
  }

  const SkillSubCategorySelector = ({
    subCategories,
    value,
    onSelect,
  }: ISkillSubCategorySelectorProps) => {
    const [query, setQuery] = useState(value || "");

    const filteredItems =
      query === ""
        ? subCategories
        : subCategories?.filter((subCategory: Maybe<SkillSubCategory>) =>
            subCategory?.name
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    const handleSelect = (val: any) => {
      if (val.name) {
        onSelect && onSelect(val);
        setQuery(val.name);
      } else {
        onSelect && onSelect({ name: val });
        setQuery(val);
      }
    };

    return (
      <Combobox as="div" value={query} onChange={handleSelect}>
        <div className="relative mb-4">
          <Combobox.Button className="w-full rounded-lg border sm:text-sm">
            <Combobox.Input
              style={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
              }}
              className="h-12 w-full rounded-md border-0 bg-white pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              displayValue={(query: string) => query}
              placeholder="Select your Sub Category"
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems && [
              ...filteredItems!.map(
                (item: Maybe<SkillSubCategory>, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <span className={`block truncate font-medium`}>
                      {item?.name}
                    </span>
                  </Combobox.Option>
                )
              ),
              query.length > 0 &&
                !filteredItems?.map((item) => item?.name).includes(query) && (
                  <Combobox.Option
                    key="new"
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={query}
                  >
                    <span className={`flex truncate font-medium`}>
                      {query}
                      <span
                        className={`block truncate pl-2 font-medium text-white`}
                      >
                        Add Sub Category
                      </span>
                    </span>
                  </Combobox.Option>
                ),
            ]}
          </Combobox.Options>
        </div>
      </Combobox>
    );
  };

  interface ISkillCategorySelectorProps {
    categories: Maybe<Array<Maybe<SkillCategory>>>;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onSelect?: (val: Maybe<SkillCategory>) => void;
  }

  const SkillCategorySelector = ({
    categories,
    value,
    onSelect,
  }: ISkillCategorySelectorProps) => {
    const [query, setQuery] = useState(value || "");

    const filteredItems =
      query === ""
        ? categories
        : categories?.filter((category: Maybe<SkillCategory>) =>
            category?.name
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    const handleSelect = (val: any) => {
      if (val.name) {
        onSelect && onSelect(val);
        setQuery(val.name);
      } else {
        onSelect && onSelect({ name: val });
        setQuery(val);
      }
    };

    return (
      <Combobox as="div" value={query} onChange={handleSelect}>
        <div className="relative mb-4">
          <Combobox.Button className="w-full rounded-lg border sm:text-sm">
            <Combobox.Input
              style={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
              }}
              className="h-12 w-full rounded-md border-0 bg-white pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              displayValue={(query: string) => query}
              placeholder="Select your Category"
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems && [
              ...filteredItems?.map(
                (item: Maybe<SkillCategory>, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <span className={`block truncate font-medium`}>
                      {item?.name}
                    </span>
                  </Combobox.Option>
                )
              ),
              query.length > 0 &&
                !filteredItems
                  .map((item: any) => item?.name)
                  .includes(query) && (
                  <Combobox.Option
                    key="new"
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={query}
                  >
                    <span className={`flex truncate font-medium`}>
                      {query}
                      <span
                        className={`block truncate pl-2 font-medium text-white`}
                      >
                        Add Category
                      </span>
                    </span>
                  </Combobox.Option>
                ),
            ]}
          </Combobox.Options>
        </div>
      </Combobox>
    );
  };

  if (!currentUser) {
    return <h1> Please Login </h1>;
  }

  if (loading || isLoading) {
    return <h1> loading </h1>;
  }

  if (error) {
    return <h1> Error {error.message} </h1>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <h1 className="bg-soilGreen-400 text-soilHeading2 mt-3 rounded-lg p-3">
        Update Category
      </h1>
      <GridLayout>
        <GridItemFour>
          <SkillCategorySelector
            categories={categories!}
            onSelect={(val: any) => {
              setSelectedCategory(val);
              setSelectedSubCategory(null);
              setSelectedSkills([]);
              setNewSubCategory(false);
              console.log(selectedSubCategory);
              if (!val._id) {
                setNewCategory(true);
              }
            }}
            value={selectedCategory?.name || undefined}
          />
        </GridItemFour>
        <GridItemFour>
          <>
            <SkillSubCategorySelector
              value={selectedSubCategory?.name || undefined}
              subCategories={
                selectedCategory?.subCategorySkill
                  ? selectedCategory?.subCategorySkill
                  : []
              }
              onSelect={(val: any) => {
                setSelectedSubCategory(val);
                setSelectedSkills([]);
                if (!val._id) {
                  setNewSubCategory(true);
                }
              }}
            />
            <SkillList
              colorRGB="148,104,154"
              skills={selectedCategory?.subCategorySkill?.map((subCat) => {
                return {
                  skillInfo: {
                    name: subCat?.name,
                  },
                };
              })}
            />
          </>
        </GridItemFour>
        <GridItemFour>
          <>
            <SearchSkill
              skills={selectedSkills}
              setSkills={setSelectedSkills}
              levels={[
                { title: "learning", level: "learning" },
                { title: "junior", level: "junior" },
                { title: "mid", level: "mid" },
                { title: "senior", level: "senior" },
              ]}
            />
            <SkillList
              closeButton={true}
              skills={selectedSubCategory?.skills?.map((skill) => {
                return {
                  skillInfo: {
                    _id: skill?._id,
                    name: skill?.name,
                  },
                };
              })}
              handleDeleteSkill={(skill: any) => {
                const tempSubCategorySkills =
                  selectedSubCategory?.skills?.filter((subCategorySkill) => {
                    return subCategorySkill?._id !== skill.skillInfo._id;
                  });

                const tempCategorySkills = selectedCategory?.skills?.filter(
                  (categorySkill) => {
                    return categorySkill?._id !== skill.skillInfo._id;
                  }
                );
                const tempSubCategory = JSON.parse(
                  JSON.stringify(selectedSubCategory)
                );
                const tempCategory = JSON.parse(
                  JSON.stringify(selectedCategory)
                );

                tempSubCategory!.skills = tempSubCategorySkills;
                tempCategory!.skills = tempCategorySkills;

                setSelectedCategory(tempCategory);
                setSelectedSubCategory(tempSubCategory);
                setDeletedSkill(true);
              }}
              colorRGB={"254,214,200"}
            />
            {selectedSkills.length > 0 && <h1>New Selected Skills</h1>}
            <SkillList
              closeButton={true}
              skills={selectedSkills}
              colorRGB={"254,214,150"}
              handleDeleteSkill={(skill: any) => {
                const tempSkills = selectedSkills.filter((selectedSkill) => {
                  return selectedSkill?.skillInfo?._id !== skill.skillInfo._id;
                });

                setSelectedSkills(tempSkills);
              }}
            />
          </>
        </GridItemFour>
        <GridItemFour>
          <Button onClick={handleUpdateCategory} variant="primary" size="lg">
            Update Category
          </Button>
        </GridItemFour>
      </GridLayout>
    </div>
  );
};

AdminPanelToAddNewSubCatagory.getLayout = (page) => (
  <AppPublicLayout>{page}</AppPublicLayout>
);

export default AdminPanelToAddNewSubCatagory;
