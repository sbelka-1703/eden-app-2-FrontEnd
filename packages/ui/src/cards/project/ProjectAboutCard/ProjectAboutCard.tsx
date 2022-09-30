import { Members, Project } from "@eden/package-graphql/generated";
import { Card, ProjectChampion, ReadMore } from "@eden/package-ui";
import { useRouter } from "next/router";
export interface ProjectAboutCardProps {
  project?: Project;
  projectOneLiner?: string;
  emoji?: any;
}

export const ProjectAboutCard = ({
  project,
  projectOneLiner,
  emoji,
}: ProjectAboutCardProps) => {
  const router = useRouter();

  return (
    <Card shadow className="bg-white p-0">
      <div className="flex flex-col justify-between p-4">
        <div className="border-b pb-3">
          <div className="bg-soilTurquoise w-fit rounded-xl p-4 text-5xl">
            {emoji}
          </div>
          <div className={`mt-6 w-full`}>
            <div className="flex h-full">
              <div className={`-mt-2 mr-auto`}>
                <div className={`text-darkGreen text-2xl font-medium`}>
                  {project?.title}
                </div>
                <div className={`text-base text-zinc-400`}>
                  {projectOneLiner}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 border-b pb-3">
          <ProjectChampion member={project?.champion as Members} />
        </div>
        <div className="mt-5">
          <div>
            <ReadMore
              description={String(project?.description)}
              characterLimit={200}
            />
          </div>
        </div>
      </div>
      <div className="align-center mt-4 flex w-full justify-center rounded-b-lg bg-slate-200 py-3 px-2 text-lg">
        <button onClick={() => router.push(`/apply/${project?.title}`)}>
          <div className="align-center text-darkGreen flex w-full cursor-pointer justify-center text-base">
            <div>More Info</div>
            <div className="px-2">{">"}</div>
          </div>
        </button>
      </div>
    </Card>
  );
};
