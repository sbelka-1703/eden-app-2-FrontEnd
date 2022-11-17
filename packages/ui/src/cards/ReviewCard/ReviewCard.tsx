import { Maybe, ProjectMemberType } from "@eden/package-graphql/generated";
import {
  ApplicationModal,
  AvailabilityComp,
  Avatar,
  Button,
  Card,
  EmojiSelector,
  GreenStepper,
  SocialMediaComp,
  TextBody,
  TextHeading2,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface ReviewCardProps {
  project?: Maybe<ProjectMemberType>;
}

export const ReviewCard = ({ project }: ReviewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const STEPS_DATA = [
    {
      name: "engaged",
      completed:
        project?.phase === "engaged" ||
        project?.phase === "shortlisted" ||
        project?.phase === "invited",
    },
    {
      name: "shortlisted",
      completed:
        project?.phase === "shortlisted" || project?.phase === "invited",
    },
    {
      name: "invited",
      completed: project?.phase === "invited",
    },
    {
      name: "committed",
      completed: project?.phase === "committed",
    },
  ];

  return (
    <>
      <Card shadow className={`h-60 overflow-scroll `}>
        <div className="mb-2 flex w-full content-center items-center justify-between">
          <div className="flex content-center items-center justify-start	p-3">
            <div>
              <Avatar
                size="lg"
                isProject
                emoji={project?.info?.emoji as string}
                backColorEmoji={project?.info?.backColorEmoji as string}
              />
            </div>
            <div className="ml-4">
              {project?.info?.title && (
                <TextHeading3>@{project?.info?.title}</TextHeading3>
              )}
              <TextHeading3 className="text-gray-400">
                {project?.role?.title}
              </TextHeading3>
            </div>
          </div>
          <div className="flex flex-row p-3">
            <div className="mx-3 rounded-full bg-emerald-300">
              <EmojiSelector isDisabled bgColor="" emoji="✨" size={40} />
            </div>
            <div className="mx-3 rounded-full	bg-pink-500">
              <EmojiSelector isDisabled bgColor="" emoji="🚀" size={40} />
            </div>
          </div>
        </div>
        <div className="mb-4 px-6 text-left text-lg font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis
          libero ex, nec finibus augue venenatis eget. Maecenas et ligula
          ligula. Vestibulum molestie tempor justo. Maecenas lectus lacus,
          sodales maximus sodales quis, mollis vel lacus. Nulla quam arcu,
          interdum pellentesque erat quis, aliquam tincidunt ligula. Aliquam sed
          nisi at metus lacinia luctus ac ut ipsum. Quisque porta leo facilisis,
          mattis ligula vitae, aliquet risus. Nunc malesuada, ex id volutpat
          iaculis, velit mi maximus orci, non semper massa felis sit amet magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis
          libero ex, nec finibus augue venenatis eget. Maecenas et ligula
          ligula. Vestibulum molestie tempor justo. Maecenas lectus lacus,
          sodales maximus sodales quis, mollis vel lacus. Nulla quam arcu,
          interdum pellentesque erat quis, aliquam tincidunt ligula. Aliquam sed
          nisi at metus lacinia luctus ac ut ipsum. Quisque porta leo facilisis,
          mattis ligula vitae, aliquet risus. Nunc malesuada, ex id volutpat
          iaculis, velit mi maximus orci, non semper massa felis sit amet magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis
          libero ex, nec finibus augue venenatis eget. Maecenas et ligula
          ligula. Vestibulum molestie tempor justo. Maecenas lectus lacus,
          sodales maximus sodales quis, mollis vel lacus. Nulla quam arcu,
          interdum pellentesque erat quis, aliquam tincidunt ligula. Aliquam sed
          nisi at metus lacinia luctus ac ut ipsum. Quisque porta leo facilisis,
          mattis ligula vitae, aliquet risus. Nunc malesuada, ex id volutpat
          iaculis, velit mi maximus orci, non semper massa felis sit amet magna.
        </div>
      </Card>
    </>
  );
};
