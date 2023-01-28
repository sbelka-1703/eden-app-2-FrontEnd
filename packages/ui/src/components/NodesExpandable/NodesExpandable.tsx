/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_SUB_NODE } from "@eden/package-graphql";
import {
  Maybe,
  Skills,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { SubNodesExpandable } from "@eden/package-ui/src";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

  const useGetSubCategories = (id: string) => {
    const { data: allSubNodesbyId } = useQuery(FIND_SUB_NODE, {
      variables: {
        fields: { _id: id },
      },
      skip: query !== "",
    });

    return allSubNodesbyId ? allSubNodesbyId?.findNodes[0]?.subNodes : [];
  };

  const fetchedSubNodes = useGetSubCategories(idSelected as string);

  useEffect(() => {
    console.log("cateogry: ", category);
  }, [category]);

  return (
    <div className="w-full">
      <div
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
        <p className="text-xs font-medium underline">
          {isExandingOpen ? (
            <IoIosArrowUp size="1.5rem" />
          ) : (
            <IoIosArrowDown size="1.5rem" />
          )}
        </p>
      </div>

      {isExandingOpen &&
        (query === "" ? fetchedSubNodes : dataSkills)?.map(
          (s: any, index: number) => {
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
              />
            );
          }
        )}
    </div>
  );
};
