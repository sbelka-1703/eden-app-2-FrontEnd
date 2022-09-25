/* eslint-disable camelcase */
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@context/eden";
import { FIND_ROLE_TEMPLATES, UPDATE_ROLE_TEMPLATE } from "@graphql/eden";
import { Maybe, RoleTemplate, SkillType_Member } from "@graphql/eden/generated";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import {
  AppPublicLayout,
  Button,
  GridItemFour,
  GridLayout,
  SearchSkill,
  SkillList,
} from "ui";

import type { NextPageWithLayout } from "../../_app";

const AdminPanel: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState<Maybe<RoleTemplate>>();
  const [selectedSkills, setSelectedSkills] = useState<
    Maybe<SkillType_Member>[]
  >([]);

  useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {
        _id: null,
      },
    },
    onCompleted: (data) => {
      setRoles(data.findRoleTemplates);
    },
  });

  const [updateRole] = useMutation(UPDATE_ROLE_TEMPLATE);

  const handelAddNewRole = () => {
    console.log("selectedRole ", selectedRole);
    console.log("selectedSkills ", selectedSkills);
    if (selectedRole && selectedRole?._id && selectedSkills.length > 0) {
      updateRole({
        variables: {
          fields: {
            _id: selectedRole._id,
            skills: [
              ...selectedSkills.map((skill) => skill?.skillInfo?._id),
              ...selectedRole.skills!.map((skill) => skill?._id),
            ],
          },
        },
        onCompleted: (data) => {
          setSelectedRole(null);
          setSelectedSkills([]);
          console.log(data);
        },
      });
    } else if (
      selectedRole &&
      selectedRole?.title &&
      selectedRole?.title?.length !== 0
    ) {
      updateRole({
        variables: {
          fields: {
            title: selectedRole?.title,
            skills: [...selectedSkills.map((skill) => skill?.skillInfo?._id)],
          },
        },
        onCompleted: (data) => {
          setSelectedRole(null);
          setSelectedSkills([]);
          console.log(data);
        },
      });
    }
  };

  interface IRoleSelectorProps {
    roles: Maybe<Array<Maybe<RoleTemplate>>>;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onSelect?: (val: Maybe<RoleTemplate>) => void;
  }

  const RoleSelector = ({ roles, value, onSelect }: IRoleSelectorProps) => {
    const [query, setQuery] = useState(value || "");

    const filteredItems =
      query === ""
        ? roles
        : roles?.filter((role: Maybe<RoleTemplate>) =>
            role?.title
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    const handleSelect = (val: any) => {
      if (val.title) {
        onSelect && onSelect(val);
        setQuery(val.title);
      } else {
        onSelect && onSelect({ title: val });
        setQuery(val);
      }
    };

    return (
      <Combobox as="div" value={query} onChange={handleSelect}>
        <div className="relative mb-4">
          <Combobox.Button className="w-full rounded-lg border sm:text-sm">
            <Combobox.Input
              style={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
              }}
              className="h-12 w-full rounded-md border-0 bg-white pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              displayValue={(query: string) => query}
              placeholder="Select your role"
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems && [
              ...filteredItems?.map(
                (item: Maybe<RoleTemplate>, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <span className={`block truncate font-medium`}>
                      {item?.title}
                    </span>
                  </Combobox.Option>
                )
              ),
              query.length > 0 &&
                !filteredItems.map((item) => item?.title).includes(query) && (
                  <Combobox.Option
                    key="new"
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={query}
                  >
                    <span className={`flex truncate font-medium`}>
                      {query}
                      <span
                        className={`block truncate pl-2 font-medium text-gray-500`}
                      >
                        Add Role
                      </span>
                    </span>
                  </Combobox.Option>
                ),
            ]}
          </Combobox.Options>
        </div>
      </Combobox>
    );
  };

  if (!currentUser) {
    return <h1> Please Login </h1>;
  }

  return (
    <GridLayout>
      <GridItemFour>
        <RoleSelector
          value={selectedRole?.title || undefined}
          roles={roles}
          onSelect={(val: Maybe<RoleTemplate>) => {
            setSelectedRole(val);
          }}
        />
      </GridItemFour>
      <GridItemFour>
        <>
          <SearchSkill
            skills={selectedSkills}
            setSkills={(val: any) => {
              setSelectedSkills(val);
            }}
            levels={[
              { title: "learning", level: "learning" },
              { title: "junior", level: "junior" },
              { title: "mid", level: "mid" },
              { title: "senior", level: "senior" },
            ]}
          />
          <SkillList
            skills={selectedRole?.skills?.map((skill) => {
              return {
                skillInfo: {
                  name: skill?.name,
                  _id: skill?._id,
                },
              };
            })}
            colorRGB={"254,214,200"}
          />
          {selectedSkills.length > 0 && <h1>New Selected Skills</h1>}
          <SkillList skills={selectedSkills} colorRGB={"254,214,150"} />
        </>
      </GridItemFour>
      <GridItemFour>
        <Button onClick={handelAddNewRole} variant="primary" size="lg">
          Add New Role
        </Button>
      </GridItemFour>
    </GridLayout>
  );
};

AdminPanel.getLayout = (page) => <AppPublicLayout>{page}</AppPublicLayout>;

export default AdminPanel;
