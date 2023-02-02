/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_SUB_NODE } from "@eden/package-graphql";
import { LevelEnum, Maybe, Skills } from "@eden/package-graphql/generated";
import { SkillSelector } from "@eden/package-ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type LevelProp = {
  title: string;
  level: string;
};

type skillType = {
  skillInfo: {
    nodeID: string;
    subNodeID: string;
    subSubNodeID: string;
  };
  level: Maybe<LevelEnum> | undefined;
};

type ExpandableProps = {
  category: string;
  skills?: skillType[];
  allSkills?: Skills[];
  isOpen?: boolean;
  selected: string | null;
  setSkills?: any;
  setIsOpen?: any;
  setSelected?: any;
  id: string;
  query: string;
  // setExpanding?: any;
  levels?: LevelProp[];
  isExpandingOpenByDefault?: boolean;
  subSubSelectedId: string | null;
};

export const SubNodesExpandable = ({
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
  // setExpanding,
  levels,
  isExpandingOpenByDefault = false,
  subSubSelectedId,
}: ExpandableProps) => {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(
    isExpandingOpenByDefault
  );
  const [idSelected, setIdSelected] = useState<string | null>(null);

  const useGetSkills = (id: string) => {
    const { data: allSkillsByNode } = useQuery(FIND_SUB_NODE, {
      variables: {
        fields: { _id: id },
      },
      skip: query !== "",
    });

    return allSkillsByNode ? allSkillsByNode.findNodes[0]?.subNodes : [];
  };

  const fetchedSkills = useGetSkills(idSelected!);

  return (
    <motion.div className="w-full">
      {category && (
        <motion.div
          onClick={() => {
            setIsExpandingOpen(!isExandingOpen);
            if (query === "") {
              setIdSelected(id);
            }
          }}
          style={{
            backgroundColor: "rgba(137, 213, 255, 0.4)",
          }}
          className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm shadow-md"
        >
          {category}
          <motion.p className="text-xs font-medium underline">
            {isExandingOpen ? (
              <IoIosArrowUp size="1.5rem" />
            ) : (
              <IoIosArrowDown size="1.5rem" />
            )}
          </motion.p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isExandingOpen &&
          (query === "" ? fetchedSkills : allSkills)?.map(
            (item: any, index: number) => (
              <SkillSelector
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                item={item}
                selected={selected}
                setSelected={setSelected}
                setSkills={setSkills}
                skills={skills}
                key={index}
                levels={levels}
                subSelectedId={isExandingOpen ? idSelected : null}
                subSubSelectedId={isExandingOpen ? subSubSelectedId : null}
              />
            )
          )}
      </motion.div>
    </motion.div>
  );
};
