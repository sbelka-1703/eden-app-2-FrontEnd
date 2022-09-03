type ExpandableProps = {
  category: string;
  skills: SelectedSkill[];
  allSkills?: Skills[];
  isOpen: boolean;
  selected: number | null;
  setSkills: any;
  setIsOpen: any;
  setSelected: any;
  id: string;
};

export function Expandable({
  category,
  skills,
  isOpen,
  selected,
  setSkills,
  setIsOpen,
  setSelected,
  id,
}: ExpandableProps) {
  const [isExandingOpen, setIsExpandingOpen] = useState<boolean>(false);

  const [idSelected, setIdSelected] = useState<string | null>(null);

  const useGetSkills = (id: string) => {
    const { data: allSkills } = useQuery(FIND_SKILL_BY_CATEGORIES, {
      variables: {
        fields: { _id: id },
      },
    });

    return allSkills ? allSkills.findSkillSubCategory.skills : [];
  };

  const fetchedSkills = useGetSkills(idSelected!);

  return (
    <div className="w-full">
      <div
        onClick={() => {
          setIsExpandingOpen(!isExandingOpen);
          setIdSelected(id);
        }}
        className="flex w-full cursor-pointer items-center justify-between bg-[#ffffff] px-3 py-2 font-bold"
      >
        {category}
        <p className="underline">{isExandingOpen ? "Hide" : "Show"}</p>
      </div>
      {isExandingOpen &&
        fetchedSkills.map((item) => (
          <div
            onClick={() => {
              if (skills.filter((s) => s.id === item._id).length > 0) {
                return;
              } else {
                setSelected(item._id);
                setIsOpen(true);
                if (isOpen) {
                  setSelected(null);
                  setIsOpen(false);
                }
              }
            }}
            className="cursor-pointer p-2"
            key={item._id}
          >
            <div
              className={`flex ${
                selected === item._id ? "bg-[#EDF2F7]" : "bg-white"
              } items-center justify-between px-4 pt-4`}
            >
              {item.name}
              {skills.filter((s) => s.id === item._id).length > 0 && (
                <h1>ADDED</h1>
              )}
            </div>

            {isOpen && selected === item._id && (
              <div className="bg-[#EDF2F7] px-4 pb-4 pt-2">
                <p className="font-semibold text-[#AAAAAA]">Skill level</p>
                <div className="flex gap-2">
                  <Selector
                    title="Interested"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "interested",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Learning"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "learning",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Junior"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "junior",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Mid"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "mid",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />
                  <Selector
                    title="Senior"
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "senior",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  />

                  <button
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          id: item._id,
                          name: item.name,
                          skillLevel: "unknown",
                        },
                      ]);
                      setIsOpen(false);
                    }}
                    className={`ml-auto  mr-2 rounded-md bg-green-400 px-3 transition-all duration-500 hover:bg-green-800 hover:text-white`}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
