import { useEffect, useState } from "react";
import { Button } from "../../elements";
import dynamic from "next/dynamic";
export interface IEmojiSelectorProps {
  onSelect: (emoji: string) => void;
}

export const EmojiSelector = ({ onSelect }: IEmojiSelectorProps) => {
  const [emojiSelect, setEmojiSelect] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const onEmojiClick = (event: any, emojiObject: any) => {
    setEmojiSelect(!emojiSelect);
    console.log(emojiObject.emoji);
    onSelect(emojiObject.emoji);
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiSelector(false);
  };

  const onShowEmojiSelector = () => {};

  return (
    <div className="flex flex-row">
      <div>
        <div className="bg-emerald-800 rounded-full p-8 text-5xl">
          {selectedEmoji ? selectedEmoji : "?"}
        </div>
      </div>
      <div>
        <Button
          onClick={() => setShowEmojiSelector(!showEmojiSelector)}
          variant="primary"
          radius="pill"
        >
          Select Emoji
        </Button>
        {showEmojiSelector ? (
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
