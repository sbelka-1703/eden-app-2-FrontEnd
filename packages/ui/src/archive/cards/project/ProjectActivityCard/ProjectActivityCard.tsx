import { Card } from "@eden/package-ui";

export interface ProjectActivityCardProps {
  date?: string;
  title?: string;
  description?: string;
}

export const ProjectActivityCard = ({
  date,
  title,
  description,
}: ProjectActivityCardProps) => {
  return (
    <Card shadow className={`w-full bg-white p-3`}>
      <div className="flex w-full flex-col">
        <div className="m-1 text-xs tracking-wider text-gray-400">{date}</div>
        <div className={"my-1/2 mx-1 text-xl tracking-wider"}>{title}</div>
        <div className="my-1/2 mx-1 text-base	tracking-normal text-gray-400">
          {description}
        </div>
      </div>
    </Card>
  );
};
