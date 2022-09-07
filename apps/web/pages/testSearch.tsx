import React, { useState } from "react";
import { SearchSkill } from "ui";

const TestSearch = () => {
  const [skills, setSkills] = useState([]);

  const levels = [
    {
      title: "learning",
      level: "learning",
    },
    {
      title: "Skilled",
      level: "mid",
    },
  ];

  return (
    <div className="w-[30rem]">
      <SearchSkill levels={levels} skills={skills} setSkills={setSkills} />
    </div>
  );
};

export default TestSearch;
