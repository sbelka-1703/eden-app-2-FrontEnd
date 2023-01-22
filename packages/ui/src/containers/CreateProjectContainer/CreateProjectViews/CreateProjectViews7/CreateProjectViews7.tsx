import { Node, Project, RoleType } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  // GridItemFour,
  // GridLayout,
  SelectBoxNode,
  // TextArea,
  // TextField,
  TextHeading3,
  TextInputLabel,
  ToggleElement,
} from "@eden/package-ui";
import { forEach, isEmpty, map } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  // useReducer,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "react-toastify";

type Inputs = {
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  expectations: string[];
  nodes: [];
  openPositions: number;
  hoursPerWeek: number;
  ratePerHour: number;
};

// const initialState: RoleType = {
//   title: "",
//   shortDescription: "",
//   description: "",
//   benefits: [],
//   expectations: [],
//   nodes: [],
//   openPositions: 0,
//   hoursPerWeek: 0,
//   ratePerHour: 0,
// };

// function reducer(state: RoleType, action: any): RoleType {
//   switch (action.type) {
//     case "HANDLE INPUT":
//       return {
//         ...state,
//         [action.field]: action.payload.value,
//       };
//     case "HANDLE EXPECTATIONS":
//       return {
//         ...state,
//         expectations: state.expectations
//           ? [
//               ...state.expectations.slice(0, action.payload.index),
//               action.payload.value,
//               ...state.expectations.slice(action.payload.index + 1),
//             ]
//           : [action.payload.value],
//       };
//     case "HANDLE BENEFITS":
//       return {
//         ...state,
//         benefits: state.benefits
//           ? [
//               ...state.benefits.slice(0, action.payload.index),
//               action.payload.value,
//               ...state.benefits.slice(action.payload.index + 1),
//             ]
//           : [action.payload.value],
//       };
//     case "HANDLE CHANGE ROLE":
//       state = action.payload.value;
//       return state;
//     default:
//       return state;
//   }
// }

export interface CreateProjectViews7Props {
  expertise?: any[];
  battery: number;
  onBack: Dispatch<SetStateAction<RoleType>>;
  onNext: Dispatch<SetStateAction<RoleType>>;
  onChange: Dispatch<SetStateAction<RoleType>>;
  project?: Project;
  setProject: Dispatch<SetStateAction<Project>>;
  roleIndex: number;
}

export const CreateProjectViews7 = ({
  onBack,
  battery,
  onNext,
  onChange,
  expertise = [],
  project,
  setProject,
  roleIndex,
}: CreateProjectViews7Props) => {
  const { register, handleSubmit, watch, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    onNext({ ...project?.role?.[roleIndex], ...data });

  const title = watch("title");
  const shortDescription = watch("shortDescription");
  const description = watch("description");
  const benefits = watch("benefits");
  const expectations = watch("expectations");
  // const nodes = watch("nodes");
  const openPositions = watch("openPositions");
  const hoursPerWeek = watch("hoursPerWeek");
  const ratePerHour = watch("ratePerHour");

  useEffect(() => {
    onChange({
      ...project?.role?.[roleIndex],
      title,
      shortDescription,
      description,
      benefits,
      expectations,
      // nodes,
      openPositions,
      hoursPerWeek,
      ratePerHour,
    });
    // setProject({
    //   ...project,
    //   role: [
    //     ...project?.role?.slice(0, roleIndex),
    //     {
    //       ...project?.role?.[roleIndex],
    //       title,
    //       shortDescription,
    //       description,
    //       benefits,
    //       expectations,
    //       nodes,
    //       openPositions,
    //       hoursPerWeek,
    //       ratePerHour,
    //     },
    //     ...project?.role?.slice(roleIndex + 1),
    //   ],
    // });
  }, [
    title,
    shortDescription,
    description,
    benefits,
    expectations,
    openPositions,
    hoursPerWeek,
    ratePerHour,
  ]);

  // const [state, dispatch] = useReducer(
  //   reducer,
  //   project?.role?.[roleIndex] || initialState
  // );

  const numInList = ["", "", "", ""];
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: Node[];
  }>({});
  const [selectedNodes, setSelectedNodes] = useState<string[] | null>(null);

  useEffect(() => {
    if (selectedItems) {
      const selectedNodeId: string[] = [];

      forEach(selectedItems, (el) => {
        if (!isEmpty(el)) {
          forEach(el, (item) => {
            // console.log("item", item);
            selectedNodeId.push(item?._id as string);
          });
        }
      });
      setSelectedNodes(selectedNodeId);
    }
  }, [selectedItems]);

  // useEffect(() => {
  //   if (selectedNodes) handleUpdateState(selectedNodes, "nodes");
  // }, [selectedItems]);

  // useEffect(() => {
  //   // if roleIndex change, update state
  //   dispatch({
  //     type: "HANDLE CHANGE ROLE",
  //     payload: {
  //       value: project?.role?.[roleIndex],
  //     },
  //   });
  // }, [roleIndex]);

  // useEffect(() => {
  //   if (state) {
  //     onChange(state);
  //   }
  // }, [state]);

  // const handleUpdateExpectations = async (
  //   value: any,
  //   field: string,
  //   index: number
  // ) => {
  //   dispatch({
  //     type: "HANDLE EXPECTATIONS",
  //     field: field,
  //     payload: {
  //       index,
  //       value,
  //     },
  //   });
  // };

  // const handleUpdateBenefits = async (
  //   value: any,
  //   field: string,
  //   index: number
  // ) => {
  //   dispatch({
  //     type: "HANDLE BENEFITS",
  //     field: field,
  //     payload: {
  //       index,
  //       value,
  //     },
  //   });
  // };

  // const handleUpdateState = async (value: any, field: string) => {
  //   dispatch({
  //     type: "HANDLE INPUT",
  //     field: field,
  //     payload: {
  //       value,
  //     },
  //   });
  // };

  // const handleNext = (value: any) => {
  //   // console.log("handleNext", value);
  //   if (!!!state.title) {
  //     toast.error("Missing Role Name");
  //   }
  //   if (!!!state.shortDescription) {
  //     toast.error("Missing Role Short Description");
  //   } else {
  //     onNext(value);
  //   }
  // };

  return (
    <Card className={`scrollbar-hide h-85 overflow-y-scroll pb-6`}>
      <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
        <div className={`space-y-4`}>
          <TextHeading3>Complete your project:</TextHeading3>
          <TextHeading3>
            Find members of Eden 🌱 Network for your project.
          </TextHeading3>
        </div>
        <div>
          <BatteryStepper size="sm" batteryPercentage={battery} />
        </div>
      </div>
      <div className={`px-7`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <div className={`my-4`}>
            <TextInputLabel>{`What role are you looking to fill:`}</TextInputLabel>
            <input
              className={`input-primary`}
              required
              value={project?.role?.[roleIndex]?.title || ""}
              {...register("title")}
            />
          </div>

          <div className="mt-3">
            <TextInputLabel>{`Select the Role: 🤖`}</TextInputLabel>
            <div className="flex w-full flex-wrap justify-center gap-1">
              {!isEmpty(expertise) &&
                map(expertise, (item: any, key: number) => (
                  <SelectBoxNode
                    multiple
                    key={key}
                    caption={item?.name}
                    items={item?.subNodes}
                    onChange={(val) => {
                      setBattery(battery < 99 ? battery + 10 : battery);
                      setSelectedItems((prevState) => ({
                        ...prevState,
                        [item?._id]: val,
                      }));
                    }}
                  />
                ))}
            </div>
          </div>
          <div className={`my-4`}>
            <TextInputLabel>{`Write a short one-line discription of the role:`}</TextInputLabel>
            <textarea
              className={`input-primary`}
              required
              rows={2}
              value={project?.role?.[roleIndex]?.shortDescription || ""}
              // defaultValue={``}
              {...register("shortDescription")}
            />
          </div>

          <ToggleElement
            isOptional
            className="my-4"
            title="Write a description of this role:"
          >
            <textarea
              className={`input-primary`}
              rows={6}
              value={project?.role?.[roleIndex]?.description || ""}
              {...register("description")}
            />
          </ToggleElement>
          <ToggleElement
            isOptional
            className="my-4"
            title="What are the expectations for this role?"
          >
            {numInList.map((v, i) => (
              <div key={i} className={`mx-4 flex py-1`}>
                <li className={`my-auto`} />
                <input
                  className={`input-primary`}
                  value={project?.role?.[roleIndex]?.expectations?.[i] || ""}
                  {...register(`expectations.${i}` as const)}
                />
              </div>
            ))}
          </ToggleElement>

          <ToggleElement
            isOptional
            className="my-4"
            title="What are the benfits of this role?"
          >
            {numInList.map((v, i) => (
              <div key={i} className={`mx-4 flex py-1`}>
                <li className={`my-auto`} />
                <input
                  className={`input-primary`}
                  value={project?.role?.[roleIndex]?.benefits?.[i] || ""}
                  {...register(`benefits.${i}` as const)}
                />
              </div>
            ))}
          </ToggleElement>

          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3`}>
            <div className={`col-span-1 flex gap-4`}>
              <div className={``}>
                <TextInputLabel>{`Availability`}</TextInputLabel>

                <input
                  className={`input-primary`}
                  defaultValue={0}
                  type={`number`}
                  {...register(`hoursPerWeek` as const, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className={`text-xs text-gray-500`}>
                <div>(Optional)</div>
                <div className={`mt-2`}>hours/ week</div>
              </div>
            </div>
            <div className={`col-span-1 flex gap-4`}>
              <div className={``}>
                <TextInputLabel>{`Hourly Rate:`}</TextInputLabel>
                <input
                  className={`input-primary`}
                  defaultValue={0}
                  type={`number`}
                  {...register(`ratePerHour` as const, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className={`text-xs text-gray-500`}>
                <div>(Optional)</div>
                <div className={`mt-2`}>$</div>
              </div>
            </div>
            <div className={`col-span-1 flex gap-4`}>
              <div className={``}>
                <TextInputLabel>{`Open Positions:`}</TextInputLabel>
                <input
                  className={`input-primary`}
                  defaultValue={0}
                  type={`number`}
                  {...register(`openPositions` as const, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className={`text-xs text-gray-500`}>
                <div>(Optional)</div>
                <div className={`mt-2`}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div></div>
            {/* <Button variant="secondary" onClick={() => onBack({ ...project })}>
              Back
            </Button> */}
            <Button variant="secondary" type="submit">
              Next
            </Button>
          </div>
        </form>

        {/* <div className={`my-4`}>
          <TextField
            label={`What role are you looking to fill:`}
            value={state?.title || ""}
            placeholder="Start typing here..."
            onChange={(e) => {
              handleUpdateState(e.target.value, "title");
            }}
          />
        </div> */}
        {/* {state?.title && ( */}
        <>
          {/* <div className="mt-3">
              <div className={`text-sm font-normal`}>
                {`Select the Role: 🤖`}
              </div>
              <div className="flex w-full flex-wrap justify-center gap-1">
                {!isEmpty(expertise) &&
                  map(expertise, (item: any, key: number) => (
                    <SelectBoxNode
                      multiple
                      key={key}
                      caption={item?.name}
                      items={item?.subNodes}
                      onChange={(val) => {
                        setSelectedItems((prevState) => ({
                          ...prevState,
                          [item?._id]: val,
                        }));
                      }}
                    />
                  ))}
              </div>
            </div> */}
          {/* <div className="mt-3">
              <TextArea
                label={`Write a short one-line discription of the role:`}
                value={state?.shortDescription || ""}
                onChange={(e) => {
                  handleUpdateState(e.target.value, "shortDescription");
                }}
                placeholder="Start typing here..."
                rows={2}
              />
            </div> */}

          {/* <ToggleElement
              isOptional
              className="my-4"
              title="Write a description of this role:"
            >
              <TextArea
                value={state?.description || ""}
                onChange={(e) => {
                  handleUpdateState(e.target.value, "description");
                }}
                rows={3}
                placeholder="Start typing here..."
              />
            </ToggleElement> */}
          {/* <ToggleElement
              isOptional
              className="my-4"
              title="What are the expectations for this role?"
            >
              {numInList.map((v, i) => (
                <div key={i} className={`mx-4 flex py-1`}>
                  <li className={`my-auto`} />
                  <TextField
                    value={state?.expectations?.[i] || ""}
                    onChange={(e) => {
                      handleUpdateExpectations(
                        e.target.value,
                        "expectations",
                        i
                      );
                    }}
                  />
                </div>
              ))}
            </ToggleElement> */}
          {/* <ToggleElement
              isOptional
              className="my-4"
              title="What are the benfits of this role?"
            >
              {numInList.map((v, i) => (
                <div key={i} className={`mx-4 flex py-1`}>
                  <li className={`my-auto`} />
                  <TextField
                    value={state?.benefits?.[i] || ""}
                    onChange={(e) => {
                      handleUpdateBenefits(e.target.value, "benefits", i);
                    }}
                  />
                </div>
              ))}
            </ToggleElement> */}
          {/* <GridLayout className="bg-white">
              <GridItemFour>
                <p className="text-sm font-normal">
                  Availability:
                  <span className="text-xs text-gray-500"> (Optional)</span>
                </p>
                <div className="flex flex-row content-center items-center">
                  <TextField
                    type="number"
                    value={state?.hoursPerWeek || 0}
                    onChange={(e) => {
                      handleUpdateState(+e.target.value, "hoursPerWeek");
                    }}
                  />
                  <div className="ml-3 text-sm font-normal text-gray-400">{`hours / week`}</div>
                </div>
              </GridItemFour>
              <GridItemFour>
                <p className="text-sm font-normal">
                  Hourly rate:
                  <span className="text-xs text-gray-500"> (Optional)</span>
                </p>
                <div className="flex flex-row content-center items-center">
                  <TextField
                    name="ratePerHour"
                    type="number"
                    value={state?.ratePerHour || 0}
                    onChange={(e) => {
                      handleUpdateState(+e.target.value, "ratePerHour");
                    }}
                  />
                  <div className="ml-3 text-sm font-normal text-gray-400">{`$`}</div>
                </div>
              </GridItemFour>
              <GridItemFour>
                <p className="text-sm font-normal">
                  Open positions:
                  <span className="text-xs text-gray-500"> (Optional)</span>
                </p>
                <div className="flex flex-row content-center items-center">
                  <TextField
                    name="positions"
                    type="number"
                    value={state?.openPositions || 0}
                    onChange={(e) => {
                      handleUpdateState(+e.target.value, "openPositions");
                    }}
                  />
                  <div className="ml-3 text-sm font-normal text-gray-400">{``}</div>
                </div>
              </GridItemFour>
            </GridLayout> */}
        </>
        {/* )} */}
        {/* <div className="mt-3 flex justify-between">
          <Button variant="secondary" onClick={() => onBack(state)}>
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleNext(state);
            }}
          >
            Next
          </Button>
        </div> */}
      </div>
    </Card>
  );
};
