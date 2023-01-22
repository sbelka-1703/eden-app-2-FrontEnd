import dynamic from "next/dynamic";
import { useState } from "react";
export interface IEmojiSelectorProps {
  bgColor?: string;
  emoji?: string;
  size?: number;
  onSelection?: React.Dispatch<React.SetStateAction<string>>;
}

export const EmojiSelector = ({
  bgColor = "#e8e8e8",
  onSelection,
  size = 60,
}: IEmojiSelectorProps) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("👋");
  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const onEmojiClick = (event: any, emojiObject: any) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiSelector(!showEmojiSelector);
    onSelection && onSelection(emojiObject.emoji);
  };

  const onShowEmojiSelector = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  return (
    <div className="flex flex-row">
      <button
        className={`flex cursor-pointer items-center justify-center rounded-full`}
        onClick={() => onShowEmojiSelector()}
        style={{
          width: size + "px",
          height: size + "px",
          fontSize: Math.ceil(size) / 2 + "px",
          backgroundColor: bgColor,
        }}
      >
        <span className="leading-none	">{selectedEmoji}</span>
      </button>
      <div>
        {showEmojiSelector ? (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ marginTop: "0px", left: "40px" }}
          />
        ) : null}
      </div>
    </div>
  );
};
