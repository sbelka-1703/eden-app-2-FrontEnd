import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { BsArrowRight, BsSuitHeart } from "react-icons/bs";
import { Avatar, Button } from "ui";

export interface IProjectInfoProps {
  project?: Project;
  avatarSrc?: string;
  projectSubTitle?: string;
  isFavoriteButton?: boolean;
  onAddFav?: () => void;
}

export const ProjectInfo = ({
  project,
  avatarSrc,
  projectSubTitle,
  isFavoriteButton,
  onAddFav,
}: IProjectInfoProps) => {
  const router = useRouter();

  return (
    <div className={`desc flex-col`}>
      <div className="p-2">
        <div className="flex flex-row content-center items-center justify-start">
          <div>
            <Avatar size="lg" src={avatarSrc} isProject />
          </div>
          <div className="ml-6">
            <div
              className={`text-2xl font-normal tracking-wide text-neutral-700`}
            >
              {project?.title}
            </div>
            <div className={`text-lg text-neutral-400`}>{projectSubTitle}</div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-justify">{project?.description}</p>
        </div>
        <div className="mt-4 flex flex-row">
          <div className="mr-5">
            <Button
              variant={`secondary`}
              radius="rounded"
              onClick={() => router.push(`/project-activity`)}
            >
              See Project Activity
              <span className={`my-auto pl-2`}>
                <BsArrowRight />
              </span>
            </Button>
          </div>
          {isFavoriteButton && (
            <div className="mr-5">
              <button
                className="text-soilBody flex flex-row content-center items-center rounded-md bg-[#FFEEEE] py-1 px-3 text-lg font-normal tracking-wide"
                onClick={onAddFav}
              >
                <span className={`mr-2`}>
                  <BsSuitHeart color="#EE0000" />
                </span>
                Add to favourites
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
