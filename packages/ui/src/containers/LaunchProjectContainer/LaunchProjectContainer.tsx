import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "@graphql/eden";
import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useState } from "react";

import { TextBody, TextHeading3 } from "../../atoms";
import { ProjectLayoutCard } from "../../cards";
import { Button, Card, TextField } from "../../elements";
import { EmojiSelector } from "../../selectors";

export interface ILaunchProjectContainerProps {}

export const LaunchProjectContainer = ({}: ILaunchProjectContainerProps) => {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>({
    title: undefined,
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {});

  const handleButtonClick = () => {
    updateProject({
      variables: {
        fields: {
          title: project?.title,
        },
      },
      onCompleted(data) {
        router.push(`/test-launch/shortlist-users/${data.updateProject._id}`);
      },
    });
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
                  setProject(
                    e.target.value
                      ? {
                          title: e.target.value,
                        }
                      : null
                  )
                }
              />
            </div>
            <div className="mb-3">
              <TextBody>Choose emoji for your project</TextBody>
            </div>
            <EmojiSelector />
          </div>
          <div className="col-span-1">
            <TextBody className="mb-1">Preview</TextBody>
            {project && <ProjectLayoutCard project={project} />}
          </div>
        </section>
      </Card>
      <Button variant="primary" className="mx-auto" onClick={handleButtonClick}>
        Next
      </Button>
    </>
  );
};
