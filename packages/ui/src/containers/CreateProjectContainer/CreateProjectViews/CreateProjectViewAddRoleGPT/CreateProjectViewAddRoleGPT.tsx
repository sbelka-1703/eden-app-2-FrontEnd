import { Maybe, NodesType, Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  DescriptionGPT,
  SelectNodes,
  TextHeading3,
  TextInputLabel,
  ToggleElement,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

type ProjectRoleInputs = {
  role: {
    title: string;
    shortDescription: string;
    description: string;
    expectations: Maybe<string>[];
    benefits: Maybe<string>[];
    nodes: Maybe<NodesType>[];
    hoursPerWeek: number;
    openPositions: number;
    ratePerHour: number;
  }[];
};

const INITAL_ROLE = {
  title: "",
  shortDescription: "",
  description: "",
  expectations: [],
  benefits: [],
  nodes: [
    {
      // nodeData: {
      // aboveNodes: [{ _id: "", name: "", node: "" }],
      // _id: "",
      // name: "",
      // node: "",
      // },
    },
  ],
  hoursPerWeek: 0,
  openPositions: 0,
  ratePerHour: 0,
};

export interface ICreateProjectViewAddRoleGPTProps {
  expertise?: any[];
  battery: number;
  onBack: () => void;
  // onNext: () => void;
  project?: Project;
  setProject: Dispatch<SetStateAction<Project>>;
  roleIndex: number;
  onNewPosition: () => void;
  onLaunch: () => void;
  descriptionOfProject?: string | null;
}

export const CreateProjectViewAddRoleGPT = ({
  onBack,
  battery,
  // onNext,
  project,
  setProject,
  roleIndex,
  onNewPosition,
  onLaunch,
  descriptionOfProject,
}: ICreateProjectViewAddRoleGPTProps) => {
  const [view, setView] = useState<"role" | "complete">("role");

  const { register, handleSubmit, watch, control } = useForm<ProjectRoleInputs>(
    {
      defaultValues: {
        // @ts-ignore
        role: project?.role || [],
      },
    }
  );
  const onSubmit: SubmitHandler<ProjectRoleInputs> = () => onLaunch();

  const { fields, append } = useFieldArray({
    name: "role",
    control,
  });

  useEffect(() => {
    const subscription = watch((data) => {
      // console.log("WATCH ---- data", data);

      setProject &&
        setProject({
          ...project,
          ...data,
        } as Project);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const numInList = ["", "", "", ""];

  const testFunction = () => {
    console.log("descriptionOfProject form Add role", descriptionOfProject);
  };

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
          {view === "role" && (
            <>
              {fields.map((field, index) => {
                return (
                  <section key={field.id}>
                    {index === roleIndex && (
                      <>
                        {/* Role Title */}
                        <div className={`my-4`}>
                          <TextInputLabel
                            htmlFor={`role-title`}
                          >{`What role are you looking to fill:`}</TextInputLabel>
                          <input
                            id={`role-title`}
                            className={`input-primary`}
                            required
                            {...register(`role.${index}.title`)}
                          />
                        </div>
                        {/* Select Nodes for Role */}
                        <div className="mt-3">
                          <TextInputLabel>{`Select the Role: 🤖`}</TextInputLabel>
                          <Controller
                            control={control}
                            name={`role.${index}.nodes`}
                            render={({ field: { onChange, value } }) => (
                              <SelectNodes
                                nodeType={"expertise"}
                                selectedNodes={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </div>
                        {/* Role Short Description */}
                        <div className={`my-4`}>
                          <TextInputLabel
                            htmlFor={`role-short-description`}
                          >{`Write a short one-line discription of the role:`}</TextInputLabel>
                          <textarea
                            id={`role-short-description`}
                            className={`input-primary`}
                            required
                            rows={2}
                            {...register(`role.${index}.shortDescription`)}
                          />
                        </div>
                        <DescriptionGPT
                          showTextArea={false}
                          onClickGPTCondition={"inputToGPT"}
                          oneLinerFromParent={watch(
                            `role.${index}.shortDescription`
                          )}
                          titleRole={watch(`role.${index}.title`)}
                        />
                        {/* Role Long Description */}
                        <ToggleElement
                          htmlFor={`role-description`}
                          isOptional
                          className="my-4"
                          title="Write a description of this role:"
                        >
                          <textarea
                            id={`role-description`}
                            className={`input-primary`}
                            rows={6}
                            {...register(`role.${index}.description`)}
                          />
                        </ToggleElement>
                        {/* Role Expectations */}
                        <ToggleElement
                          htmlFor={`role-expectations`}
                          isOptional
                          className="my-4"
                          title="What are the expectations for this role?"
                        >
                          {numInList.map((v, i) => (
                            <div key={i} className={`mx-4 flex py-1`}>
                              <li className={`my-auto`} />
                              <input
                                className={`input-primary`}
                                {...register(
                                  `role.${index}.expectations.${i}` as const
                                )}
                              />
                            </div>
                          ))}
                        </ToggleElement>
                        {/* Role Benefits */}
                        <ToggleElement
                          htmlFor={`role-benefits`}
                          isOptional
                          className="my-4"
                          title="What are the benfits of this role?"
                        >
                          {numInList.map((v, i) => (
                            <div key={i} className={`mx-4 flex py-1`}>
                              <li className={`my-auto`} />
                              <input
                                className={`input-primary`}
                                {...register(
                                  `role.${index}.benefits.${i}` as const
                                )}
                              />
                            </div>
                          ))}
                        </ToggleElement>

                        <div
                          className={`grid grid-cols-1 gap-4 sm:grid-cols-3`}
                        >
                          {/* Role Availability */}
                          <div className={`col-span-1 flex gap-4`}>
                            <div className={``}>
                              <TextInputLabel
                                htmlFor={`role-availability`}
                              >{`Availability`}</TextInputLabel>

                              <input
                                id={`role-availability`}
                                className={`input-primary`}
                                defaultValue={0}
                                type={`number`}
                                min={0}
                                {...register(
                                  `role.${index}.hoursPerWeek` as const,
                                  {
                                    valueAsNumber: true,
                                  }
                                )}
                              />
                            </div>
                            <div className={`text-xs text-gray-500`}>
                              <div>(Optional)</div>
                              <div className={`mt-2`}>hours/ week</div>
                            </div>
                          </div>
                          {/* Role Hourly Rate */}
                          <div className={`col-span-1 flex gap-4`}>
                            <div className={``}>
                              <TextInputLabel
                                htmlFor={`role-hourly-rate`}
                              >{`Hourly Rate:`}</TextInputLabel>
                              <input
                                id={`role-hourly-rate`}
                                className={`input-primary`}
                                defaultValue={0}
                                type={`number`}
                                min={0}
                                {...register(
                                  `role.${index}.ratePerHour` as const,
                                  {
                                    valueAsNumber: true,
                                  }
                                )}
                              />
                            </div>
                            <div className={`text-xs text-gray-500`}>
                              <div>(Optional)</div>
                              <div className={`mt-2`}>$</div>
                            </div>
                          </div>
                          {/* Role Duration */}
                          <div className={`col-span-1 flex gap-4`}>
                            <div className={``}>
                              <TextInputLabel
                                htmlFor={`role-open-positions`}
                              >{`Open Positions:`}</TextInputLabel>
                              <input
                                id={`role-open-positions`}
                                className={`input-primary`}
                                defaultValue={0}
                                type={`number`}
                                min={0}
                                {...register(
                                  `role.${index}.openPositions` as const,
                                  {
                                    valueAsNumber: true,
                                  }
                                )}
                              />
                            </div>
                            <div className={`text-xs text-gray-500`}>
                              <div>(Optional)</div>
                              <div className={`mt-2`}></div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </section>
                );
              })}
              <div className="mt-4 flex justify-between">
                <Button
                  type={`button`}
                  variant={`secondary`}
                  onClick={() => onBack()}
                >
                  Back
                </Button>
                <Button
                  variant={`secondary`}
                  type={`button`}
                  onClick={() => setView("complete")}
                >
                  Next
                </Button>
              </div>
            </>
          )}
          {view === "complete" && (
            <div className="px-7">
              <TextHeading3>
                Open position has been succesfully added!
              </TextHeading3>
              <TextHeading3>Do you want to open another position?</TextHeading3>
              <div className="mt-4 flex justify-center gap-7">
                <Button
                  variant="secondary"
                  type={`button`}
                  onClick={() => {
                    setView("role");
                    append({
                      ...INITAL_ROLE,
                    });
                    onNewPosition();
                    testFunction();
                  }}
                >
                  Add New Position
                </Button>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Button
                  variant="secondary"
                  type={`button`}
                  onClick={() => setView("role")}
                >
                  Back
                </Button>
                <Button variant="secondary" type={`submit`}>
                  Launch
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};
