import { Maybe } from "@graphql/eden/generated";
import { Combobox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useState } from "react";

interface IItems {
  _id?: number | Maybe<string> | undefined;
  name?: Maybe<string> | undefined;
  title?: Maybe<string> | undefined;
  __typename?: Maybe<string> | undefined;
}

export interface DropdownProps {
  items: IItems[];
  label?: string;
  value?: string;
  placeholder?: string;
  radius?: "default" | "rounded" | "pill";
  // eslint-disable-next-line no-unused-vars
  onSelect?: (val: any) => void;
  multiple?: boolean;
}

export const Dropdown = ({
  items,
  label,
  value,
  placeholder,
  onSelect,
  multiple = false,
  radius = "default",
}: DropdownProps) => {
  const [query, setQuery] = useState(value || "");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item: IItems) =>
          item.name
            ?.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelect = (val: any) => {
    onSelect && onSelect(val);
    if (!multiple) {
      setQuery(val.name);
    }
  };

  const cls = clsx(
    "h-10 focus:border-accentColor focus:ring-accentColor w-full border-none bg-transparent py-1.5 pl-3 pr-10 focus:outline-none focus:ring-1 sm:text-sm",
    {
      "rounded-full": radius === "pill",
      "rounded-xl": radius === "rounded",
      "rounded-md": radius === "default",
    }
  );

  return (
    <Combobox as="div" value={query} onChange={(val: any) => handleSelect(val)}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1 mb-4">
        <Combobox.Button className="w-full bg-white sm:text-sm">
          <Combobox.Input
            className={cls}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(query: string) => query}
            placeholder={placeholder}
            style={{
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Combobox.Button>

        <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItems && filteredItems.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredItems &&
            filteredItems?.map((item: IItems, index: number) => (
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
                  {item.name || item.title}
                </span>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
