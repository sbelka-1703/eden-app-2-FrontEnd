import React, { useState } from "react";
import { SearchSkill } from "ui";

const TestSearch = () => {
  const [skills, setSkills] = useState([]);

  return (
    <div className="w-[30rem]">
      <SearchSkill skills={skills} setSkills={setSkills} />
    </div>
  );
};

export default TestSearch;
