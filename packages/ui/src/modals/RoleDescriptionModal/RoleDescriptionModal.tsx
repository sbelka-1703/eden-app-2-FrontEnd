import { RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Dropdown,
  Modal,
  TextArea,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useState } from "react";

export interface RoleDescriptionModalInterface {
  isModalOpen: boolean;
  roles: any;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (val: any) => void;
}

export const RoleDescriptionModal = ({
  roles,
  isModalOpen,
  handleSubmit,
}: RoleDescriptionModalInterface) => {
  const [selectedRole, setSelectedRole] = useState({ title: null, _id: null });
  const [modifiedRoles, setModifiedRoles] = useState(roles);

  const handleChangeDescription = (e: any) => {
    const newRoles = modifiedRoles.map((role: RoleType) => {
      if (role._id !== selectedRole._id) return role;
      return {
        ...role,
        description: e.target.value,
      };
    });

    setModifiedRoles(newRoles);
  };

  const handleChangeResponsibility = (val: any) => {
    const newRoles = modifiedRoles.map((role: RoleType) => {
      if (role._id !== selectedRole._id) return role;
      return {
        ...role,
        keyRosponsibilities: val,
      };
    });

    setModifiedRoles(newRoles);
  };

  const handleChangeHoursPerWeek = (val: any) => {
    const newRoles = modifiedRoles.map((role: RoleType) => {
      if (role._id !== selectedRole._id) return role;
      return {
        ...role,
        hoursPerWeek: Number(val.name),
      };
    });

    setModifiedRoles(newRoles);
  };

  const handleChangeOpenPositions = (val: any) => {
    const newRoles = modifiedRoles.map((role: RoleType) => {
      if (role._id !== selectedRole._id) return role;
      return {
        ...role,
        openPositions: Number(val.name),
      };
    });

    setModifiedRoles(newRoles);
  };

  return (
    <Modal
      open={isModalOpen}
      title="Please add description & detail of the role for people to have more context when they're invited to apply!"
    >
      <div className="grid grid-cols-5 gap-8 pt-2">
        <div className="col-span-1 w-max pt-4">
          {roles.map((role: any) => (
            <div
              key={role._id}
              onClick={() =>
                setSelectedRole({ title: role.title, _id: role._id })
              }
              className={`border-soilGray mb-4 w-full ${
                selectedRole._id === role._id && "border-soilGreen-600"
              } cursor-pointer rounded-lg border-2 px-4 py-2 text-center text-xl`}
            >
              {role.title}
            </div>
          ))}
        </div>
        <div className="border-soilGreen-600 col-span-4 rounded-lg border-2 p-4">
          <TextHeading3>{selectedRole?.title}</TextHeading3>
          <div className="relative flex w-full items-start justify-center gap-5">
            {selectedRole._id === null && (
              <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(255,255,255,0.9)] text-3xl">
                No role is selected
              </div>
            )}
            <div className="h-full w-full">
              <p>Describe the role:</p>
              <TextArea
                key={selectedRole._id}
                value={
                  modifiedRoles.find(
                    (role: any) => selectedRole._id === role._id
                  )?.description
                }
                onChange={handleChangeDescription}
                className="h-full"
                rows={10}
                height={"100%"}
                placeholder="start typing here"
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-2">
                <Dropdown
                  radius="rounded"
                  placeholder="Hours"
                  label="Availability"
                  items={[
                    { _id: 1, name: "10" },
                    { _id: 2, name: "20" },
                    { _id: 3, name: "30" },
                    { _id: 4, name: "40" },
                  ]}
                  onSelect={handleChangeHoursPerWeek}
                />{" "}
                <TextLabel className="ml-1 -mb-3">hours/week</TextLabel>
                {/* <Dropdown
                  radius="rounded"
                  placeholder="week/month"
                  items={[
                    { _id: 1, name: "week" },
                    { _id: 2, name: "month" },
                  ]}
                /> */}
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700"></label>
                <div className="w-5/12">
                  <Dropdown
                    radius="rounded"
                    placeholder="#"
                    items={[
                      { _id: 1, name: "1" },
                      { _id: 2, name: "2" },
                      { _id: 2, name: "3" },
                      { _id: 2, name: "4" },
                    ]}
                    onSelect={handleChangeOpenPositions}
                  />
                </div>
              </div>
              <div>
                <p>Key responsibilities</p>
                <TextArea
                  onChange={(e) => handleChangeResponsibility(e.target.value)}
                  placeholder="start typing here"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="mx-auto mt-4"
        onClick={() => handleSubmit(modifiedRoles)}
      >
        All done!
      </Button>
    </Modal>
  );
};
