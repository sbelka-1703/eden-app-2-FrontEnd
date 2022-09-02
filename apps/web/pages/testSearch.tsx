import React, { useState } from "react";
import { SearchBar } from "ui";

const allSkills = [
  { id: 1, name: "Reactjs", category: "Frontend" },
  { id: 2, name: "Nextjs", category: "Frontend" },
  { id: 3, name: "Node", category: "Backend" },
  { id: 4, name: "Express", category: "Backend" },
];

const testSearch = () => {
  const [skills, setSkills] = useState([]);

  return (
    <div>
      <SearchBar allSkills={allSkills} skills={skills} setSkills={setSkills} />
    </div>
  );
};

export default testSearch;
