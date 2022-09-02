import React, { useState } from "react";
import { SearchBar } from "ui";

const TestSearch = () => {
  const [skills, setSkills] = useState([]);

  return (
    <div>
      <SearchBar skills={skills} setSkills={setSkills} />
    </div>
  );
};

export default TestSearch;
