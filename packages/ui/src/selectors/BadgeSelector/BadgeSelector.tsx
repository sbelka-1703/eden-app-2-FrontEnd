import { useEffect, useState } from "react";

export interface IBadgeSelectorProps {
  items: any[];
  reset?: boolean;
  multiple?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
}

export const BadgeSelector = ({
  reset,
  onChange,
  items = [],
  multiple = true,
}: IBadgeSelectorProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleChange = (e: any) => {
    if (e.target.checked) {
      if (multiple) {
        setSelected([
          ...selected,
          items.find((item) => item._id === e.target.value),
        ]);
      } else {
        setSelected([items.find((item) => item._id === e.target.value)]);
      }
    } else {
      setSelected(selected.filter((item) => item._id !== e.target.value));
    }
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  // @TODO hardcoded to be removed
  const color = "#e8e8e8";

  useEffect(() => {
    if (reset) {
      setSelected([]);
    }
  }, [reset]);

  return (
    <section className="text-center">
      {items?.map((item) => (
        <div key={item._id} className="mr-2 mb-1 inline-block">
          {(item.name || item.title) && (
            <>
              <input
                type="checkbox"
                name={item._id}
                id={item._id}
                value={item._id}
                onChange={handleChange}
                className="peer hidden"
                checked={selected.find(
                  (selectedItem) => selectedItem._id === item._id
                )}
              />
              <label
                htmlFor={item._id}
                className="border-accentColor peer-checked:shadow-focusShadow cursor-pointer rounded-full py-px px-3 peer-checked:mx-1"
                style={{ backgroundColor: color || "#e8e8e8" }}
              >
                {item.name || item.title}
              </label>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
