import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  TextHeading3,
  TextInputLabel,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  descriptionOneLine: string;
  description: string;
};

export interface CreateProjectViews2Props {
  battery: number;
  onBack: Dispatch<SetStateAction<Project>>;
  onNext: Dispatch<SetStateAction<any>>;
  setProject: Dispatch<SetStateAction<any>>;
  project?: Project;
}

export const CreateProjectViews2 = ({
  onBack,
  battery,
  onNext,
  setProject,
  project,
}: CreateProjectViews2Props) => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    onNext({ ...project, ...data });

  const descriptionOneLine = watch("descriptionOneLine");
  const description = watch("description");

  useEffect(() => {
    setProject({
      ...project,
      descriptionOneLine,
      description,
    });
  }, [descriptionOneLine, description]);

  return (
    <Card className={`scrollbar-hide h-85 overflow-y-scroll pb-6`}>
      <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
        <TextHeading3>Complete your Project:</TextHeading3>
        <BatteryStepper size="sm" batteryPercentage={battery} />
      </div>
      <div className="px-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <TextInputLabel>
            {`Write short one-liner to introduce your project:`}
          </TextInputLabel>
          <textarea
            className={`input-primary`}
            rows={3}
            required
            defaultValue={project?.descriptionOneLine || ""}
            {...register("descriptionOneLine")}
          />

          <TextInputLabel>
            {`Write a full description of your project:`}
          </TextInputLabel>
          <textarea
            className={`input-primary`}
            rows={8}
            required
            defaultValue={project?.description || ""}
            {...register("description")}
          />

          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() =>
                onBack({ ...project, descriptionOneLine, description })
              }
            >
              Back
            </Button>
            <Button variant="secondary" type="submit">
              Next
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
