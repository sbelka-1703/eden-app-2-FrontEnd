import { useQuery } from "@apollo/client";
import { FIND_PROJECTS } from "@graphql/eden";
// import { Project } from "@graphql/eden";
// import {
//   Project,
//   ProjectUpdate,
//   useFindMembersQuery,
//   useFindProjectsQuery,
//   useFindProjectsUpdateQuery,
//   useFindTeamsQuery,
// } from "@graphql/eden/generated/graphql";
import { Button, Dropdown, SkillSelector } from "ui";

const items = [
  { _id: 1, name: "Skill 1" },
  { _id: 2, name: "Skill 2" },
  { _id: 3, name: "Skill 3" },
  { _id: 4, name: "Skill 4" },
];

export default function Web() {
  // console.log("findProjects", Project);
  const { data } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  console.log("data", data);
  return (
    <div>
      <span className="p-8 text-3xl font-bold text-gray-600">Web</span>

      <div className="p-8">
        <Button>Default Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="tertiary">Warning Button</Button>
      </div>

      <div className="p-8">
        <Button variant="primary">Primary Button</Button>
        <Button variant="primary" radius="pill">
          Pill Button
        </Button>
        <Button variant="primary" radius="rounded">
          Rounded Button
        </Button>
      </div>
      <Dropdown
        items={items}
        label={`skill`}
        placeholder={`select skill`}
        onSelect={(val: any) => console.log(val)}
        multiple
      />
      <SkillSelector
        onSetSkills={(val: any) => console.log(val)}
        showSelected
      />
    </div>
  );
}
