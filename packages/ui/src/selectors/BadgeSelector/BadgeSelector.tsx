import { useEffect, useState } from "react";

export interface IBadgeSelectorProps {
  items: any[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
}

export const BadgeSelector = ({
  items = [],
  onChange,
}: IBadgeSelectorProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleChange = (e: any) => {
    if (e.target.checked) {
      setSelected([
        ...selected,
        items.find((item) => item._id === e.target.value),
      ]);
    } else {
      setSelected(selected.filter((item) => item._id !== e.target.value));
    }
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  // @TODO hardcoded to be removed
  const color = "#e8e8e8";

  return (
    <section className="text-center">
      {items?.map((item, index) => (
        <div key={index} className="mr-2 mb-1 inline-block">
          <input
            type="checkbox"
            name={item._id}
            id={item._id}
            value={item._id}
            onChange={handleChange}
            className="peer hidden"
          />
          <label
            htmlFor={item._id}
            className="border-accentColor peer-checked:shadow-focusShadow cursor-pointer rounded-full py-px px-3 peer-checked:mx-1"
            style={{ backgroundColor: color || "#e8e8e8" }}
          >
            {item.name || item.title}
          </label>
        </div>
      ))}
    </section>
  );
};
