/* eslint-disable camelcase */
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
  FIND_SKILL_CATEGORIES,
  UPDATE_SKILL_CATEGORY,
  UPDATE_SKILL_SUB_CATEGORY,
} from "@graphql/eden";
import {
  Maybe,
  SkillCategory,
  SkillSubCategory,
  SkillType_Member,
} from "@graphql/eden/generated";
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
import { SkillCategorySelector, SkillSubCategorySelector } from "./_utils";

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
