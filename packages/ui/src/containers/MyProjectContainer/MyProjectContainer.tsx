import { Card, ProjectInfo } from "ui";

export interface IMyProjectContainerProps {}

export const MyProjectContainer = ({}: IMyProjectContainerProps) => {
  return (
    <Card shadow className="h-8/10 bg-white p-6">
      <div className={`text-darkGreen font-poppins text-2xl font-medium`}>
        🎉 Congrats on being a part of the team!
      </div>
      <div className={`font-Inter text-base text-zinc-500`}>
        Find more information below
      </div>
      <ProjectInfo />
    </Card>
  );
};
