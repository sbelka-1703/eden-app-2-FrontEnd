/* eslint-disable camelcase */
import {
  Maybe,
  SkillCategory,
  SkillSubCategory,
} from "@graphql/eden/generated";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";

export interface ISkillSubCategorySelectorProps {
  subCategories: Maybe<Array<Maybe<SkillSubCategory>>>;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (val: Maybe<SkillSubCategory>) => void;
}

export const SkillSubCategorySelector = ({
  subCategories,
  value,
  onSelect,
}: ISkillSubCategorySelectorProps) => {
  const [query, setQuery] = useState(value || "");

  const filteredItems =
    query === ""
      ? subCategories
      : subCategories?.filter((subCategory: Maybe<SkillSubCategory>) =>
          subCategory?.name
            ?.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelect = (val: any) => {
    if (val.name) {
      onSelect && onSelect(val);
      setQuery(val.name);
    } else {
      onSelect && onSelect({ name: val });
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
            placeholder="Select your Sub Category"
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
            ...filteredItems!.map(
              (item: Maybe<SkillSubCategory>, index: number) => (
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
                    {item?.name}
                  </span>
                </Combobox.Option>
              )
            ),
            query.length > 0 &&
              !filteredItems?.map((item) => item?.name).includes(query) && (
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
                      className={`block truncate pl-2 font-medium text-white`}
                    >
                      Add Sub Category
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

export interface ISkillCategorySelectorProps {
  categories: Maybe<Array<Maybe<SkillCategory>>>;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (val: Maybe<SkillCategory>) => void;
}

export const SkillCategorySelector = ({
  categories,
  value,
  onSelect,
}: ISkillCategorySelectorProps) => {
  const [query, setQuery] = useState(value || "");

  const filteredItems =
    query === ""
      ? categories
      : categories?.filter((category: Maybe<SkillCategory>) =>
          category?.name
            ?.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelect = (val: any) => {
    if (val.name) {
      onSelect && onSelect(val);
      setQuery(val.name);
    } else {
      onSelect && onSelect({ name: val });
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
            placeholder="Select your Category"
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
              (item: Maybe<SkillCategory>, index: number) => (
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
                    {item?.name}
                  </span>
                </Combobox.Option>
              )
            ),
            query.length > 0 &&
              !filteredItems.map((item: any) => item?.name).includes(query) && (
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
                      className={`block truncate pl-2 font-medium text-white`}
                    >
                      Add Category
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
