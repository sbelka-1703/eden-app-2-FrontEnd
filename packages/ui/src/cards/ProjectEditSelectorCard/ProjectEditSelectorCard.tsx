import { Project } from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  ProgressBar,
  Button,
  EmojiSelector,
} from "@eden/package-ui";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { format, differenceInBusinessDays } from "date-fns";
// import {sub} from "date-fns/sub"
export interface ProjectEditSelectorCardProps {
  project?: Project;
  emoji?: string;
  totalDays?: number;
  currentDayCount?: number;
  backgroundColor?: string;
  onEdit?: () => void;
  onBack?: () => void;
  onSelect?: (data: any) => void;
}

export const ProjectEditSelectorCard = ({
  project,
  emoji,
  totalDays = 100,
  currentDayCount = 50,
  onBack,
  onEdit,
  onSelect,
  backgroundColor,
}: ProjectEditSelectorCardProps) => {
  if (!project) return null;

  const ComplitionDate = new Date(Number(project?.dates?.complition));
  const KickOff = new Date(Number(project?.dates?.kickOff));
  const daysLeft = differenceInBusinessDays(KickOff, ComplitionDate);

  const onSelectRole = (data: any) => {
    if (onSelect) onSelect(data);
  };
  return (
    <Card shadow className={`w-full bg-white p-3`}>
      <div className="flex flex-row content-center items-center justify-between">
        <div
          // onClick={onClickBack}
          className="text-soilGray cursor-pointer"
          onClick={onBack}
        >
          <ChevronLeftIcon className="mr-1 -mt-1 inline" width={20} />
          <span className="group-hover:underline">Go Back</span>
        </div>
        <div>
          <Button
            variant="default"
            radius="rounded"
            size="md"
            className="shadow-xl"
            onClick={onEdit}
          >
            🛠 Edit Project
          </Button>
        </div>
      </div>
      <div className="mt-2 flex w-full">
        <div>
          {emoji ? (
            <EmojiSelector isDisabled emoji={emoji} bgColor={backgroundColor} />
          ) : (
            <Avatar src={`${project.champion?.discordAvatar}`} size={`md`} />
          )}
        </div>
        <div className={`my-auto pl-4`}>
          <div className={`text-xl`}>{project.title}</div>
        </div>
      </div>
      <div className="mt-2">
        <div className={`text-lg text-zinc-400`}>{`Launched on ${format(
          KickOff,
          "MMM do"
        )}`}</div>
        <div className={`text-sm text-zinc-400`}>
          {daysLeft > 0
            ? `${daysLeft} days left till applications close`
            : "Application Closed"}
        </div>
        {daysLeft ? (
          <div className="mt-3 -mb-3">
            <ProgressBar
              totalDays={totalDays}
              currentDayCount={currentDayCount}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-2 overflow-hidden">
        {project.role?.map((data) => (
          <div
            id="data?.title"
            className="shadow-cardShadow  hover:border-accentColor m-2 rounded-2xl border-[2px] border border-zinc-400 p-6"
            onClick={() => onSelectRole(data?.skills)}
          >
            {data?.title}
          </div>
        ))}
      </div>
    </Card>
  );
};
