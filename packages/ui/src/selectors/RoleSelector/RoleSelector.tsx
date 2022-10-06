import { Maybe, RoleTemplate } from "@eden/package-graphql/generated";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";

export interface IRoleSelectorProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (val: Maybe<RoleTemplate>) => void;
  multiple?: boolean;
  roleSelected?: () => void;
  removeLabel?: boolean;
}

export const RoleSelector = ({
  roles,
  value,
  onSelect,
  multiple = false,
  roleSelected,
  removeLabel,
}: IRoleSelectorProps) => {
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
    onSelect && onSelect(val);
    roleSelected && roleSelected();
    if (!multiple) {
      setQuery(val.title);
    }
  };

  return (
    <Combobox as="div" value={query} onChange={(val: any) => handleSelect(val)}>
      {removeLabel ? (
        <Combobox.Label className="font-Inter block text-lg text-black">
          TO GET STARTED, TELL US YOUR ROLE:
        </Combobox.Label>
      ) : (
        <></>
      )}
      <div className="relative mb-4">
        <Combobox.Button className="w-full rounded-lg border sm:text-sm">
          <Combobox.Input
            style={{
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
            }}
            className="h-12 w-full rounded-md border-0 bg-white pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
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

        <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItems && filteredItems.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredItems &&
            filteredItems?.map((item: Maybe<RoleTemplate>, index: number) => (
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
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
