import {
  Maybe,
  Node,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  SelectBoxNode,
  TextHeading3,
  TextInputLabel,
  ToggleElement,
} from "@eden/package-ui";
import { forEach, isEmpty, map } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type ProjectRoleInputs = {
  role: {
    title: string;
    shortDescription: string;
    description: string;
    expectations: Maybe<string>[];
    benefits: Maybe<string>[];
    nodes: [];
    hoursPerWeek: number;
    // nodes?: Maybe<Array<Maybe<NodesType>>>; // TODO fix type
    openPositions: number;
    ratePerHour: number;
  }[];
};

export interface CreateProjectViews7Props {
  expertise?: any[];
  battery: number;
  onBack: () => void;
  onNext: () => void;
  project?: Project;
  setProject: Dispatch<SetStateAction<Project>>;
  roleIndex: number;
}

export const CreateProjectViews7 = ({
  onBack,
  battery,
  onNext,
  expertise = [],
  project,
  setProject,
  roleIndex,
}: CreateProjectViews7Props) => {
  const { register, handleSubmit, watch, control, setValue } =
    useForm<ProjectRoleInputs>({
      defaultValues: {
        role: [
          {
            title: project?.role?.[roleIndex]?.title || "",
            shortDescription:
              project?.role?.[roleIndex]?.shortDescription || "",
            description: project?.role?.[roleIndex]?.description || "",
            benefits: project?.role?.[roleIndex]?.benefits || [],
            expectations: project?.role?.[roleIndex]?.expectations || [],
            nodes: [],
            openPositions: project?.role?.[roleIndex]?.openPositions || 0,
            hoursPerWeek: project?.role?.[roleIndex]?.hoursPerWeek || 0,
            ratePerHour: project?.role?.[roleIndex]?.ratePerHour || 0,
          },
        ],
      },
    });
  const onSubmit: SubmitHandler<ProjectRoleInputs> = () => onNext();

  const { fields, append } = useFieldArray({
    name: "role",
    control,
  });

  useEffect(() => {
    if (roleIndex) {
      if (isEmpty(project?.role?.[roleIndex])) {
        append({
          title: project?.role?.[roleIndex]?.title || "",
          shortDescription: project?.role?.[roleIndex]?.shortDescription || "",
          description: project?.role?.[roleIndex]?.description || "",
          benefits: project?.role?.[roleIndex]?.benefits || [],
          expectations: project?.role?.[roleIndex]?.expectations || [],
          nodes: [],
          openPositions: project?.role?.[roleIndex]?.openPositions || 0,
          hoursPerWeek: project?.role?.[roleIndex]?.hoursPerWeek || 0,
          ratePerHour: project?.role?.[roleIndex]?.ratePerHour || 0,
        });
      } else {
        if (project?.role?.[roleIndex]) {
          // console.log("project?.role?.[roleIndex]", project?.role?.[roleIndex]);
          // TODO: fix type
          // @ts-ignore
          setValue("role", [
            ...(project?.role?.slice(0, roleIndex) as RoleType[]),
            {
              ...project?.role?.[roleIndex],
              ...(fields[roleIndex] as unknown as RoleType),
            },
            ...(project?.role?.slice(roleIndex + 1) as RoleType[]),
          ]);
        }
      }
    }
  }, [roleIndex]);

  useEffect(() => {
    const subscription = watch((data) => {
      setProject &&
        setProject({
          ...project,
          role: [
            ...(project?.role?.slice(0, roleIndex) as RoleType[]),
            {
              ...project?.role?.[roleIndex],
              // TODO: fix type
              // @ts-ignore
              ...(data.role[roleIndex] as RoleType),
            },
            ...(project?.role?.slice(roleIndex + 1) as RoleType[]),
          ],
        });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
          {fields.map((field, index) => {
            return (
              <section key={field.id}>
                {index === roleIndex && (
                  <>
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
                    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3`}>
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
                            {...register(`role.${index}.ratePerHour` as const, {
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
            <Button variant={`secondary`} type={`submit`}>
              Next
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
