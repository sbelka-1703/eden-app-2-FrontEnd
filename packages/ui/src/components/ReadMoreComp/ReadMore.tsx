import { useEffect, useState } from "react";

export interface IReadMoreProps {
  description?: string;
  characterLimit?: number;
}

export const ReadMore = ({
  description = "",
  characterLimit = 20,
}: IReadMoreProps) => {
  const [showReadMore, setShowReadMore] = useState(false);
  const [toggleReadMore, setToggleReadMore] = useState(false);
  useEffect(() => {
    if (characterLimit < description?.length) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
    }
  }, []);

  const truncateString = (str: string, len: number) => {
    if (len <= 3) {
      return str.slice(0, len - 3);
    } else {
      return str.slice(0, len);
    }
  };
  const truncateDescriptions = (desc: string) => {
    if (showReadMore) {
      const showedString = truncateString(desc, characterLimit);
      return showedString;
    } else {
      return desc;
    }
  };
  const onReadMore = () => {
    setToggleReadMore(true);
    setShowReadMore(false);
  };
  return (
    <div className="flex-col">
      <div className={`desc text-base text-zinc-400`}>
        {truncateDescriptions(description)}
      </div>
      {showReadMore ? (
        <div className="cursor-pointer" onClick={() => onReadMore()}>
          ...more
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
