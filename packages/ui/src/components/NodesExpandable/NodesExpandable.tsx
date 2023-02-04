/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_SUB_NODE } from "@eden/package-graphql";
import { LevelEnum, Maybe, Skills } from "@eden/package-graphql/generated";
import { SubNodesExpandable } from "@eden/package-ui/src";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  dataSkills: any;
  setSelected?: any;
  id: string;
  query: string;
  levels?: LevelProp[];
  isExpandingOpenByDefault?: boolean;
  subNodes?: any;
};

export const NodesExpandable = ({
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
  subNodes,
}: ExpandableProps) => {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(
    isExpandingOpenByDefault
  );
  const [idSelected, setIdSelected] = useState<string | null>(null);

  const { data: allSubNodesbyId, refetch: refetchSubNodesbyId } = useQuery(
    FIND_SUB_NODE,
    {
      variables: {
        fields: { _id: idSelected },
      },
      skip: query !== "" && idSelected === null,
    }
  );

  useEffect(() => {
    if (query === "" && idSelected !== null) {
      refetchSubNodesbyId();
    }
  }, [idSelected, query]);

  return (
    <motion.div className="w-full">
      <motion.div
        layout
        onClick={() => {
          setIsExpandingOpen(!isExandingOpen);
          if (query === "") {
            setIdSelected(id);
          }
        }}
        className={` flex w-full cursor-pointer items-center justify-between ${
          isExandingOpen ? "bg-[#89D5FF]" : "border-[1px] border-[#89D5FF]"
        }  px-3 py-2 text-sm`}
      >
        {category}
        <motion.p layout className="text-xs font-medium underline">
          {isExandingOpen ? (
            <IoIosArrowUp size="1.5rem" />
          ) : (
            <IoIosArrowDown size="1.5rem" />
          )}
        </motion.p>
      </motion.div>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isExandingOpen &&
          (query === ""
            ? allSubNodesbyId?.findNodes[0]?.subNodes
            : dataSkills
          )?.map((s: any, index: number) => {
            return (
              <SubNodesExpandable
                query={query}
                category={query === "" ? s.name : subNodes[index]?.name}
                id={s._id}
                skills={skills!}
                allSkills={query !== "" && subNodes[index]?.subNodes}
                isOpen={isOpen}
                selected={selected}
                setIsOpen={setIsOpen}
                setSkills={setSkills}
                key={index}
                setSelected={setSelected}
                // setExpanding={(e: boolean) => setInFocus(e)}
                levels={levels}
                isExpandingOpenByDefault={query == "" ? false : !index}
                subSubSelectedId={isExandingOpen ? idSelected : null}
              />
            );
          })}
      </motion.div>
    </motion.div>
  );
};
