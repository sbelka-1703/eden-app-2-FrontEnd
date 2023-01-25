/* eslint-disable camelcase */
import { useQuery } from "@apollo/client";
import { FIND_SUB_NODE } from "@eden/package-graphql";
import {
  Maybe,
  Skills,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { Button } from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  setSelected?: any;
  id: string;
  query: string;
  // setExpanding?: any;
  levels?: LevelProp[];
  isExpandingOpenByDefault?: boolean;
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

  useEffect(() => {
    console.log("CATEGORY", category);
  }, [category]);

  return (
    <div className="w-full">
      {category && (
        <div
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
          <p className="text-xs font-medium underline">
            {isExandingOpen ? (
              <IoIosArrowUp size="1.5rem" />
            ) : (
              <IoIosArrowDown size="1.5rem" />
            )}
          </p>
        </div>
      )}
      {isExandingOpen &&
        (query === "" ? fetchedSkills : allSkills)?.map((item: any) => (
          <div
            onClick={() => {
              if (
                skills!.filter((s) => s?.skillInfo?._id === item._id).length > 0
              ) {
                return;
              } else {
                setSelected(item._id);
                setIsOpen(true);
                if (selected) {
                  setSelected(null);
                  //   // setIsOpen(false);
                }
              }
            }}
            key={item._id}
            className="border-b-[1px] border-[#EDF2F7]"
          >
            <div
              style={{ background: "rgba(137, 213, 255, 0.1)" }}
              className={`flex py-3 ${
                selected === item._id ? "-mx-2" : ""
              } group w-full cursor-pointer items-center justify-between px-5`}
            >
              <span className="w-3/4 px-2 text-sm text-slate-700 group-hover:text-slate-500">
                {item.name}
              </span>
              {skills!.filter((s) => s?.skillInfo?._id === item._id).length >
              0 ? (
                <CheckCircleIcon color="rgb(116, 250, 109)" width={24} />
              ) : (
                <IoIosAdd size="1.5rem" />
              )}
            </div>

            {isOpen && selected === item._id && (
              <div
                style={{ background: "rgba(137, 213, 255, 0.1)" }}
                className="ml-2 px-4 pt-1 pb-2"
              >
                <p className="mb-1 text-xs font-medium text-slate-500">
                  SKILL LEVEL
                </p>
                <div className="-ml-1 flex gap-2">
                  {levels!.map((level, index) => (
                    <Button
                      key={index}
                      // className="h-6 py-1 px-2 text-xs"
                      size="sm"
                      style={{ background: "rgba(137, 213, 255, 0.15)" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setSkills([
                          ...skills!,
                          {
                            skillInfo: {
                              _id: item._id,
                              name: item.name,
                              categorySkills: item.categorySkills,
                            },
                            level: level.level,
                          },
                        ]);
                        // setIsOpen(false);
                        setSelected(null);
                      }}
                      variant="secondary"
                    >
                      {level.title.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
