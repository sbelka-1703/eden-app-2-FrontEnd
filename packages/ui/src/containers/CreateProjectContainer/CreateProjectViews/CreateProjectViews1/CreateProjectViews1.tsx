import { UserContext } from "@eden/package-context";
import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  EmojiSelector,
  ServerSelectorMulti,
  TextHeading3,
  TextInputLabel,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  emoji: string;
  backColorEmoji: string;
  serverID: string[];
};

export interface CreateProjectViews1Props {
  battery?: number;
  onNext: () => void;
  setProject?: Dispatch<SetStateAction<Project>>;
  project?: Project;
}

export const CreateProjectViews1 = ({
  battery = 0,
  // onBack,
  onNext,
  setProject,
  project,
}: CreateProjectViews1Props) => {
  const { memberServers } = useContext(UserContext);
  const { register, handleSubmit, watch, control } = useForm<Inputs>({
    defaultValues: {
      title: project?.title || "",
      emoji: project?.emoji || "",
      backColorEmoji: project?.backColorEmoji || "#e8e8e8",
      serverID: [],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = () => onNext();

  const emoji = watch("emoji");
  const backColorEmoji = watch("backColorEmoji");

  useEffect(() => {
    const subscription = watch((data) => {
      setProject &&
        setProject({
          ...project,
          ...data,
        } as Project);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const filterMemberServers = () => {
    const filteredMemberServers = memberServers.filter((server) =>
      project?.serverID?.includes(server?._id as string)
    );

    return filteredMemberServers;
  };

  return (
    <Card className={`scrollbar-hide h-85 overflow-y-scroll pb-6`}>
      <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
        <TextHeading3>
          {` Hello & Welcome! Let’s launch your first project🚀`}
        </TextHeading3>
        <BatteryStepper size="sm" batteryPercentage={battery ? battery : 5} />
      </div>
      <div className="px-7">
        <TextHeading3 className="my-4">
          Name your project and pick a visual!
        </TextHeading3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <TextInputLabel
            htmlFor={`project-title`}
          >{`Name your project`}</TextInputLabel>
          <input
            id={`project-title`}
            className={`input-primary`}
            required
            {...register("title")}
          />

          <div>
            <TextInputLabel>
              {`Please Choose a Discord Server to get Applicants from`}
            </TextInputLabel>
            <Controller
              name={`serverID`}
              control={control}
              render={({ field: { onChange, ref } }) => (
                <ServerSelectorMulti
                  defaultValues={filterMemberServers()}
                  onChange={onChange}
                  inputRef={ref}
                />
              )}
            />
          </div>

          <div className="my-4">
            <TextInputLabel>
              {`Choose an emoji & color for your project`}
            </TextInputLabel>
            <div className="flex items-center gap-4">
              <Controller
                name={`emoji`}
                control={control}
                render={({ field }) => (
                  <EmojiSelector
                    {...field}
                    size={60}
                    emoji={emoji}
                    bgColor={backColorEmoji}
                    onSelection={(value) => field.onChange(value)}
                  />
                )}
              />

              <div className="flex h-[60px] w-[60px] items-center overflow-hidden rounded-full border-2 border-zinc-400/50">
                <input
                  type="color"
                  className="-m-2 h-[140px] w-[140px] cursor-pointer"
                  {...register("backColorEmoji")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div></div>

            <Button variant="secondary" type="submit">
              Next
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
