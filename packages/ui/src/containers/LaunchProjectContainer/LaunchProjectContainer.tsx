import { LaunchProjectContext, ProjectActionKind } from "@eden/package-context";
import {
  Button,
  Card,
  EmojiSelector,
  ProjectLayoutCard,
  TextBody,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

export interface ILaunchProjectContainerProps {}

export const LaunchProjectContainer = ({}: ILaunchProjectContainerProps) => {
  const router = useRouter();

  const { project, dispatchProject, projectEmoji, setProjectEmoji } =
    useContext(LaunchProjectContext);

  const handleButtonClick = () => {
    router.push("/test-launch-2/shortlist-users");
  };

  return (
    <>
      <Card className="mb-8 bg-white p-6">
        <section className="mb-6">
          <TextHeading3>
            Future Champion? Welcome to Eden!
            <br />
            Let&rsquo;s get started and go through launching your first project.
          </TextHeading3>
          <p className="text-soilGray text-sm">
            You can exit at any time, your workflow will be saved to drafts.
          </p>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Name your project</TextBody>
              <TextField
                name="title"
                placeholder="Start typing here"
                onChange={(e) =>
                  dispatchProject!({
                    type: ProjectActionKind.SET_NAME,
                    payload: e.target.value ? e.target.value : null,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <TextBody>Choose emoji for your project</TextBody>
            </div>
            <EmojiSelector onSelection={(value) => setProjectEmoji(value)} />
          </div>
          <div className="col-span-1">
            <TextBody className="mb-1">Preview</TextBody>
            {project && (
              <ProjectLayoutCard project={project} emoji={projectEmoji} />
            )}
          </div>
        </section>
      </Card>
      <Button variant="primary" className="mx-auto" onClick={handleButtonClick}>
        Next
      </Button>
    </>
  );
};
