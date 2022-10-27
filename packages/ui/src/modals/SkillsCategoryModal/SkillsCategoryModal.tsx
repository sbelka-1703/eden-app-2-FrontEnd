/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_ALL_MAIN_CATEGORIES } from "@eden/package-graphql";
import { BadgeSelector, Button, Modal, TextHeading3 } from "@eden/package-ui";
import { useState } from "react";

export interface ISkillsCategoryModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (val: any[]) => void;
}

export const SkillsCategoryModal = ({
  isOpen,
  onSubmit,
}: ISkillsCategoryModalProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  // eslint-disable-next-line no-unused-vars
  const { data: categories, loading: categoriesLoading } = useQuery(
    FIND_ALL_MAIN_CATEGORIES
  );

  const handleChange = (val: any[]) => {
    setSelected(val);
  };

  return (
    <div>
      <Modal open={isOpen} closeOnEsc={false}>
        <div className={`h-1/2`}>
          <TextHeading3 className="mb-4">Select categories:</TextHeading3>
          <section className="mb-4">
            <BadgeSelector
              items={categories?.findSkillCategories}
              onChange={handleChange}
            />
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
