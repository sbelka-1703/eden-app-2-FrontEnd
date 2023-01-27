import { NodesSearchSkill } from "@eden/package-ui";
import React, { useState } from "react";

const Search = () => {
  const [skills, setSkills] = useState<any>([]);
  const levels = [
    {
      title: "learning",
      level: "learning",
    },
    {
      title: "mid",
      level: "mid",
    },
    {
      title: "junior",
      level: "junior",
    },
    {
      title: "senior",
      level: "senior",
    },
  ];

  return (
    <>
      <div>index</div>
      <NodesSearchSkill setSkills={setSkills} skills={skills} levels={levels} />
    </>
  );
};

export default Search;
