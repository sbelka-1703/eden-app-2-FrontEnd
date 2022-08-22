import { useState } from "react";
import { ProjectList, TabsCard } from "ui";

const tabs = ["All Projects", "Favourites", "Recommended"];

export interface ProjectsContainerProps {
  allProjects?: any;
  favouriteProjects?: any;
  recommendedProjects?: any;
}

export const ProjectsContainer = ({
  allProjects,
  favouriteProjects,
  recommendedProjects,
}: ProjectsContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // if (allProjects) console.log("allProjects", allProjects);
  // if (favouriteProjects) console.log("favouriteProjects", favouriteProjects);
  // if (recommendedProjects)
  //   console.log("recommendedProjects", recommendedProjects);
  return (
    <div className="rounded-xl">
      <TabsCard tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && <ProjectList projects={allProjects} />}
        {activeTab === 1 && <ProjectList projects={favouriteProjects} />}
        {activeTab === 2 && <ProjectList projects={recommendedProjects} />}
      </div>
    </div>
  );
};
