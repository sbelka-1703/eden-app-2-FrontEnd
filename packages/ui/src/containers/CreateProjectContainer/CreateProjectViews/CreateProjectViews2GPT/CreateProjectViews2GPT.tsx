import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  DescriptionGPT,
  TextHeading3,
  TextInputLabel,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  descriptionOneLine: string;
  description: string;
};

export interface CreateProjectViews2GPTProps {
  battery: number;
  onBack: () => void;
  onNext: () => void;
  setProject?: Dispatch<SetStateAction<any>>;
  project?: Project;
  onReturn?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CreateProjectViews2GPT = ({
  onBack,
  battery,
  onNext,
  setProject,
  project,
  onReturn,
}: CreateProjectViews2GPTProps) => {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm<Inputs>({
      defaultValues: {
        descriptionOneLine: project?.descriptionOneLine || "",
        description: project?.description || "",
      },
    });
  const autocomplete =
    'I want you to act as a text extension assistant. Do not edit or change the sentences I give you in any way. I give you sentences and you return those sentences unedited with a continuation to those sentences. \nExample: \nI write: A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage. They are responsible for installing, repairing and maintaining pipes, fixtures and other plumbing equipment.\nYou respond with:  A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage. They are responsible for installing, repairing and maintaining pipes, fixtures and other plumbing equipment.   Plumbers also inspect structures to identify any potential problems, such as clogged drains, leaking pipes and faulty water heaters. In addition, they install appliances such as dishwashers and water heaters, and may be asked to perform basic carpentry work to install kitchen and bathroom cabinets.\nI write: Today was a crazy day in the lab, instruments were not working and our computer system went down. Everyone was scrambling to find a solution, with no luck. \nYou respond with: Today was a crazy day in the lab, instruments were not working and our computer system went down. Everyone was scrambling to find a solution, with no luck. After a few hours of troubleshooting, we realized that we needed to call in a professional. We contacted a local plumber, who arrived quickly and was able to diagnose the problem in no time. He was able to repair the faulty wiring and get our instruments and computer system back up and running. We were extremely thankful for his expertise, and all of the researchers were relieved that our experiments could get back on track.\n\nExample complete.\n\nDo not write "You respond with:" in you response\n\nHere are the sentence/sentences that I give you: \n\n\n';

  const onSubmit: SubmitHandler<Inputs> = () => onNext();

  useEffect(() => {
    const subscription = watch((data) => {
      setProject &&
        setProject({
          ...project,
          ...data,
        });
    });

    return () => subscription.unsubscribe();
  }, [watch]);
  /////////////
  const returnHandler = () => {
    const description = getValues().description;

    onReturn(description);
    console.log("getValues(description)+++++++", description);
  };
  /////////////////////////

  return (
    <Card className={`scrollbar-hide h-85 overflow-y-scroll pb-6`}>
      <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
        <TextHeading3>Complete your Project:</TextHeading3>
        <BatteryStepper size="sm" batteryPercentage={battery} />
      </div>
      <div className="px-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="mb-4">
            <TextInputLabel htmlFor={`project-short-description`}>
              {`Write short one-liner to introduce your project:`}
            </TextInputLabel>
            <textarea
              id={`project-short-description`}
              className={`input-primary`}
              rows={3}
              required
              // {...register("descriptionOneLine")}
              {...register("descriptionOneLine")}
            />
            <Controller
              name={"description"}
              control={control}
              render={() => (
                <DescriptionGPT
                  showTextArea={false}
                  customPrompt={autocomplete}
                  messageFromParent={watch("descriptionOneLine")}
                  onReturn={(val: any) => {
                    setValue("description", val);
                  }}
                />
              )}
            />
          </div>

          <TextInputLabel htmlFor={`project-description`}>
            {`Write a full description of your project:`}
          </TextInputLabel>
          <textarea
            id={`project-description`}
            className={`input-primary`}
            rows={8}
            required
            {...register("description")}
          />

          <div className="flex justify-between">
            <Button
              variant={`secondary`}
              type={`button`}
              onClick={() => onBack()}
            >
              Back
            </Button>
            <Button
              variant={`secondary`}
              type={`submit`}
              onClick={returnHandler}
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
