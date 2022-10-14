import dynamic from "next/dynamic";
import { useState } from "react";
export interface IEmojiSelectorProps {
  isDisabled?: boolean;
  bgColor?: string;
  emoji?: string;
  size?: number;
  // eslint-disable-next-line no-unused-vars
  onSelection?: (val: any) => void;
}

export const EmojiSelector = ({
  isDisabled,
  emoji = "👋",
  bgColor = "#e8e8e8",
  onSelection,
  size = 60,
}: IEmojiSelectorProps) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const onEmojiClick = (event: any, emojiObject: any) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiSelector(false);
    onSelection && onSelection(emojiObject.emoji);
  };

  const onShowEmojiSelector = () => {
    setShowEmojiSelector(true);
  };

  return (
    <div className="flex flex-row">
      <div>
        <div
          className={`flex cursor-pointer items-center justify-center rounded-full`}
          onClick={() => onShowEmojiSelector()}
          style={{
            width: size + "px",
            height: size + "px",
            fontSize: Math.ceil(size) / 2 + "px",
            backgroundColor: bgColor,
          }}
        >
          <span className="leading-none	">
            {emoji && isDisabled ? emoji : selectedEmoji}
          </span>
        </div>
      </div>
      <div>
        {showEmojiSelector && !isDisabled ? (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ marginTop: "0px", left: "40px" }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
