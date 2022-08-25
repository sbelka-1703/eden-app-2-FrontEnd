import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Avatar, Button, Card } from "ui";

export interface ApplyContainerProps {
  project?: Project;
  onApply?: () => void;
}

export const ApplyContainer = ({ project, onApply }: ApplyContainerProps) => {
  const router = useRouter();

  if (!project) return null;
  console.log("project", project);

  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`relative h-full`}>
        <div className={`text-2xl font-medium text-black/80`}>
          Magic Application
        </div>
        <div className={`mt-8 flex`}>
          <Avatar src={``} />
          <div className={`pl-8`}>
            <div className={`text-darkGreen text-2xl font-bold`}>
              {project.title}
            </div>
            <div>
              ⚡
              <span className={`text-soilPurple text-3xl font-semibold`}>
                %
              </span>
            </div>
          </div>
        </div>
        <div className={`absolute bottom-2 flex w-full justify-between`}>
          <Button onClick={() => router.back()}>
            <span className={`my-auto pl-2`}>
              <BsArrowLeft />
            </span>
            Go Back
          </Button>

          <Button variant={`primary`} onClick={onApply}>
            Apply Now
            <span className={`my-auto pl-2`}>
              <BsArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
