import dynamic from "next/dynamic";
import { useState } from "react";
export interface IEmojiSelectorProps {
  isDisabled?: boolean;
  // bgColor?: string;
  emoji?: string;
  // eslint-disable-next-line no-unused-vars
  onSelection?: (val: any) => void;
}

export const EmojiSelector = ({
  isDisabled,
  emoji,
  onSelection,
}: IEmojiSelectorProps) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("@");
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
          className={`cursor-pointer rounded-full bg-[#ffdce9] p-7 text-5xl`}
          onClick={() => onShowEmojiSelector()}
        >
          {emoji && isDisabled ? emoji : selectedEmoji}
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
